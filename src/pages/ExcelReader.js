import { TeamNameMapping } from "../components/TeamNameMapping";
import React, { useEffect, useState } from "react";
import { PageContainer } from "../components/Components.styled";
import TeamLogo from "../components/TeamLogo";
import { TeamData } from "./TeamData";
import { getCurrentWeek } from "../components/Calendar";
import { app } from "../firebase";
import * as XLSX from "xlsx";

const database = app.database();

function ExcelReader() {
  const [data, setData] = useState([]);
  const [matchData, setMatchData] = useState([]);
  const [week, setWeek] = useState(0);
  const poolKey = "-O8zA9u5Wr506WBNqV2I";
  const userId = "xsg02hTTKkaOsRU1vRv5okUz1Zx1";
  const weeks = Array.from({ length: 18 }, (_, index) => `Week ${index + 1}`);

  const handleSubmit = (event) => {
    // Submit the selections
    event.preventDefault();

    sortedUsersData.forEach((item) => {
      const compoundKey = `${item.playerName}_${item.poolKey}_${item.week}`;
      const existingEntryRef = database
        .ref(`selections/${poolKey}/Week ${week}`)
        .child(compoundKey);

      existingEntryRef.once("value", (snapshot) => {
        if (snapshot.exists()) {
          existingEntryRef.update({
            playerName: item.playerName,
            selections: item.selections,
            tiebreakValue: item.tiebreakValue,
            poolKey: poolKey,
            userId: userId,
            week: parseInt(week),
          });
        } else {
          database
            .ref(`selections/${poolKey}/Week ${week}`)
            .child(compoundKey)
            .set({
              playerName: item.playerName,
              selections: item.selections,
              tiebreakValue: item.tiebreakValue,
              poolKey: poolKey,
              userId: userId,
              week: parseInt(week),
            });
        }
      });

      console.log(compoundKey);
    });
  };

  useEffect(() => {
    const fetchMatchData = async () => {
      const matchData = await TeamData(week);
      setMatchData(matchData);
    };
    fetchMatchData();
  }, [week]);

  useEffect(() => {
    setWeek(getCurrentWeek());
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      // Parse data
      const data = new Uint8Array(evt.target.result);
      const wb = XLSX.read(data, { type: "array" });
      // Get first worksheet
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // Convert array of arrays
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log("jsonData:", jsonData);
      // Update state
      setData(jsonData);
      console.log("jsonData:", jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const sortedUsersData = data.slice(1).map((item) => {
    if (item) {
      const selections = item.slice(1, item.length - 1);

      const teamNameFormattted = selections.map((team) => {
        return team.replace(/\s/g, "").toUpperCase();
      });

      const selectionIds = teamNameFormattted.map(
        (team) => TeamNameMapping[team]?.id
      );
      const playerName = item[0].replace(".", "");

      return {
        playerName: playerName,
        selections: selectionIds,
        tiebreakValue: item[item.length - 1],
        poolKey: "-O8zA9u5Wr506WBNqV2I",
        userId: "xsg02hTTKkaOsRU1vRv5okUz1Zx1",
        week: week,
      };
    }
  });

  useEffect(() => {
    sortedUsersData.forEach((item, index) => {
      if (item.selections.some((selection) => selection === undefined)) {
        console.log(`Item at index ${index} has undefined selection.`);
      }
    });
  }, [sortedUsersData]);

  console.log(sortedUsersData);
  console.log(sortedUsersData[0]);

  return (
    <div className="container">
      <div className="table-responsive">
        <table border="0" cellPadding="0" cellSpacing="0" id="picksTable">
          <thead>
            <tr>
              <td className="sticky headcell" width="100">
                <span className="n">
                  <b>ENTRY NAME</b>
                </span>
                <span className="pts">Weekly Points</span>
              </td>

              {matchData.matches &&
              matchData.matches &&
              matchData.matches.length > 0 ? (
                matchData.matches.map((match, index) => {
                  return (
                    <React.Fragment>
                      <td
                        key={index}
                        className="sticky headcell"
                        width="48"
                        align="center"
                        valign="bottom"
                      >
                        <strong>
                          {match.team1Abbr}
                          <br />
                          at
                          <br />
                          {match.team2Abbr}
                        </strong>
                      </td>
                    </React.Fragment>
                  );
                })
              ) : (
                <p>Loading</p>
              )}
              <td
                className="sticky headcell"
                width="48"
                align="center"
                valign="bottom"
              >
                <strong>
                  MNF
                  <br />
                  Tie
                  <br />
                  Pts
                </strong>
              </td>
            </tr>
            {sortedUsersData.map((item, rowIndex) => (
              <tr key={rowIndex}>
                <td className="sticky headcell" width="100">
                  <span className="n">
                    <b>{item.playerName} </b>
                  </span>
                </td>
                {item.selections.map((teamId, colIndex) => {
                  if (teamId === undefined) {
                    alert(
                      `Undefined teamId for ${
                        item.playerName
                      }, on selection number ${colIndex + 1}`
                    );

                    return null; // or return a default element
                  }

                  const resultItem = matchData.results
                    ? matchData.results.find(
                        (result) => result.id === teamId.toString()
                      )
                    : undefined;
                  const isWinner = resultItem ? resultItem.winner : false;

                  const tdClass =
                    (colIndex === 0 ? "first-col-class " : "") +
                    (isWinner === undefined
                      ? "undefined-class"
                      : isWinner
                      ? "winner-class"
                      : "loser-class");

                  return (
                    <td className={tdClass} key={colIndex}>
                      <TeamLogo teamId={teamId} type={"picks"} />
                    </td>
                  );
                })}
                <td className="tie">
                  {item.tiebreakValue}
                  <span className="tb">
                    ({item.tiebreakValue - matchData.mondayScores})
                  </span>
                </td>
              </tr>
            ))}
          </thead>
        </table>
      </div>
      <div
        style={{ marginTop: "20px" }}
        className="d-flex justify-content-between "
      >
        <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
        <select
          style={{ width: "160px" }}
          onChange={(e) => {
            setWeek(e.target.value);
          }}
          value={week}
          className="form-select"
          name="week"
          id="week"
        >
          {weeks.map((week, index) => (
            <option key={index} value={index + 1}>
              {week}
            </option>
          ))}
        </select>
        <input
          id="btnSubmit"
          type="submit"
          class="btn btn-danger"
          value="Submit Your Picks"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default ExcelReader;
