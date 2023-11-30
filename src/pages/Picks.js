import React, { useEffect, useState } from "react";
import ProgressCircle from "../components/ProgressCircle";
import "@fortawesome/fontawesome-free/css/all.css";
import classes from "./picks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import TeamData from "./TeamData";
import TeamLogo from "../components/TeamLogo";
import { useParams } from "react-router-dom";
import styles from "../components/ManageEntries.module.css";
import { app } from "../firebase";
import "firebase/compat/database";

const Picks = () => {
  const [matchData, setMatchData] = useState([]);
  const [selections, setSelections] = useState([]);
  const [week, setWeek] = useState(1);
  const [results, setResults] = useState([]);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const newPoints = selections.map((item) => {
      console.log(item.playerName);
      const playerName = item.playerName;
      let selectionObject = 0; // Initialize with a default value
      item.selections.forEach((selection) => {
        const resultItem = results.find(
          (result) => result.id === selection.toString()
        );

        const isWinner = resultItem ? resultItem.winner : false;

        if (isWinner) {
          selectionObject = selectionObject + 1;
        }
      });
      let point = {};
      if (playerName) {
        point[playerName] = selectionObject;
      }
      return point;
    });

    setPoints(newPoints);
  }, [selections, results]);

  useEffect(() => {
    const dataArray = [...selections];
    selections.sort((a, b) => b.playerName.localeCompare(a.playerName));

    console.log("points", dataArray);
  }, [points]);

  useEffect(() => {});

  // const { poolId } = useParams();
  const poolId = "-NkN4le9I5JNY92sXeUH"; // Temp
  const weeks = Array.from({ length: 18 }, (_, index) => `Week ${index + 1}`);
  console.log("selections", selections);
  useEffect(() => {
    TeamData(week).then((data) => {
      setMatchData(data);
    });
  }, [week]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const database = app.database();
        const selectionRef = database.ref("selections");

        const query = selectionRef.orderByChild("poolKey").equalTo(poolId);

        query.on("value", (snapshot) => {
          const result = [];
          snapshot.forEach((childSnapshot) => {
            const selectionData = childSnapshot.val();
            if (selectionData.week === parseInt(week, 10)) {
              result.push({ id: childSnapshot.key, ...selectionData });
            }
          });

          setSelections(result);
        });
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    };

    fetchData();
  }, [poolId, week]);

  useEffect(() => {
    const API_ENDPOINT_URL = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=${week}&dates=2023`;

    fetch(API_ENDPOINT_URL)
      .then((response) => response.json())
      .then((data) => {
        if (!data || !Array.isArray(data.events)) {
          console.error("Data structure is not as expected");
          return;
        }

        const events = data.events || [];

        const newResultsArray = events.flatMap((event) =>
          event.competitions.flatMap((competition) =>
            competition.competitors.map((competitor) => ({
              id: competitor.id,
              winner: competitor.winner,
            }))
          )
        );

        setResults(newResultsArray);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [week]);

  return (
    <div className="content-area">
      <div className="container">
        <div className="wholeWrapper">
          <div className="stickyLeftWrapper">
            <h1>POOL MEMBERS' PICKS FOR WEEK {week} </h1>
            <div className="header row">
              <ProgressCircle
                progress={100}
                gradientColor={"gray"}
                id={"gray"}
                title={"Active Entries"}
                action={"View all members"}
                value={2}
              ></ProgressCircle>
              <ProgressCircle
                progress={50}
                gradientColor={"green"}
                id={"green"}
                title={"Week 11 Picks in"}
                action={"View members with picks"}
                value={1}
              ></ProgressCircle>
              <ProgressCircle
                progress={50}
                gradientColor={"red"}
                id={"red"}
                title={"Week 11 Picks not in"}
                action={"View members without picks"}
                value={1}
              ></ProgressCircle>
              <div className="col-12 col-md-4 noprint form-horizontal">
                <div
                  style={{ marginBottom: "14px", textAlign: "right" }}
                  className="noprint"
                >
                  <a className="btn btn-outline-danger btn-sm">
                    <FontAwesomeIcon icon={faPrint} />
                    &nbsp;&nbsp;Printable Version
                  </a>
                  &nbsp;&nbsp;
                  <a className="btn btn-outline-danger btn-sm">
                    <FontAwesomeIcon icon={faFileExcel} />
                    &nbsp;&nbsp;Export to CSV
                  </a>
                </div>
                <form className="row">
                  <label htmlFor="week" className="col-sm-4 col-form-label">
                    Select a week:
                  </label>
                  <div className="col-md-8" style={{ marginBottom: "10px" }}>
                    <select
                      onChange={(e) => {
                        setWeek(e.target.value);
                      }}
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
                  </div>
                </form>
                <form className="row">
                  <label htmlFor="week" className="col-sm-4 col-form-label">
                    Sort picks by:
                  </label>
                  <div className="col-md-8" style={{ marginBottom: "10px" }}>
                    <select className="form-select" name="sort" id="sort">
                      <option value="1">Entry Name</option>
                      <option value="2">YTD Standings</option>
                      <option value="3">Weekly Standing</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="well noprint">
            <strong>Note:</strong>
            All picks will appear in the grid below after the pick deadline
            passes (usually Sunday at 1:00 pm ET). Earlier game picks will show
            up once the game has started and picks for that game can't be added
            or changed.
          </div>
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

                  {matchData.map((match, index) => {
                    return (
                      <React.Fragment>
                        {matchData && matchData.length > 0 ? (
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
                        ) : (
                          <p>Loading</p>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tr>
                {selections.map((item, rowIndex) => {
                  const pointItem = points.find((obj) =>
                    obj.hasOwnProperty(item.playerName)
                  );
                  const pointValue = pointItem ? pointItem[item.playerName] : 0;

                  return (
                    <tr key={rowIndex}>
                      <td className="sticky headcell" width="100">
                        <span className="n">
                          <b>
                            {item.fullName ? item.fullName : item.playerName}
                          </b>
                          <span className="pts">{pointValue} Points</span>
                        </span>
                      </td>
                      {item.selections.map((teamId, colIndex) => {
                        const resultItem = results.find(
                          (result) => result.id === teamId.toString()
                        );
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
                    </tr>
                  );
                })}
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Picks;
