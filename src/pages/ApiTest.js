import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/auth-context";
import { TeamAbbrMapping } from "../components/TeamNameMapping";
import classes from "./apiTest.css";
import { app } from "../firebase";
import "firebase/compat/database";
import TeamLogo from "../components/TeamLogo";
import { useNavigate } from "react-router-dom";
import { SelectionData } from "../components/selectionData";
import { MatchData } from "./TeamData";
import cutOffDates from "../components/cutOffDates";

const database = app.database();

const ApiTest = ({ poolKey, week }) => {
  const [matchData, setMatchData] = useState([]);
  const [selections, setSelections] = useState({});
  const [selected, setSelected] = useState([]);
  const [tiebreakValue, SetTiebreakvalue] = useState();
  const [playerName, SetPlayerName] = useState();
  const [deadlineDates, setDeadlineDates] = useState([]);

  const { currentUser, userData } = useContext(AuthContext);
  const [displayName] = useState(userData.displayName);
  const userId = currentUser.uid;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(displayName);
    console.log(userData.displayName);
  }, [userData]);

  useEffect(() => {
    cutOffDates(week).then((data) => {
      setDeadlineDates(data);
    });
    console.log(week);
    MatchData(week).then((data) => {
      setMatchData(data);
    });
  }, [week]);

  useEffect(() => {
    console.log(week, poolKey, userData.displayName);
    SelectionData(week, poolKey, userData.displayName)
      .then((data) => {
        if (data && data.length > 0 && data[0].selections) {
          console.log("Fetched data:", data[0].selections);

          const newSelections = data[0].selections.map((teamId, index) => {
            return {
              index: index,
              teamId: teamId,
            };
          });

          setSelected(newSelections);
        } else {
          console.warn("No selections data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [week, poolKey, userData.displayName]);

  useEffect(() => {
    SetPlayerName(userData.displayName);
  }, [userData.displayName]);

  let lastDate = "";

  const tiebreakHandler = (event) => {
    SetTiebreakvalue(event.target.value);
  };

  const handleSelection = (matchId, teamId) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [matchId]: teamId,
    }));
  };

  const handleSubmit = (event) => {
    // Submit the selections
    event.preventDefault();

    const numberToNameMapping = {};

    for (const key in selections) {
      if (selections.hasOwnProperty(key)) {
        const teamId = selections[key];
        const teamAbbreviation = Object.keys(TeamAbbrMapping).find(
          (abbr) => TeamAbbrMapping[abbr].id === teamId
        );

        if (teamAbbreviation) {
          numberToNameMapping[key] = TeamAbbrMapping[teamAbbreviation].name;
        }
      }
    }

    const compoundKey = `${playerName}_${poolKey}_${week}`;

    const existingEntryRef = database
      .ref(`selections/${poolKey}/Week ${week}`)
      .child(compoundKey);

    existingEntryRef.once("value", (snapshot) => {
      if (snapshot.exists()) {
        existingEntryRef.update({
          playerName: playerName,
          selections: selections,
          tiebreakValue: tiebreakValue,
          poolKey: poolKey,
          userId: userId,
          week: parseInt(week),
        });
      } else {
        database
          .ref(`selections/${poolKey}/Week ${week}`)
          .child(compoundKey)
          .set({
            playerName: playerName,
            selections: selections,
            tiebreakValue: tiebreakValue,
            poolKey: poolKey,
            userId: userId,
            week: parseInt(week),
          });
      }
    });
    navigate(`/Picksin/${poolKey}`);
  };

  let indexCounter = 1;

  const sortedMatches = [...matchData].sort((a, b) => {
    const dateA = new Date(a.dateString);
    const dateB = new Date(b.dateString);
    return dateA - dateB;
  });

  const handleDivClick = (index, teamId) => {
    setSelected((prevState) => {
      // Check if the teamId already exists in prevState
      const existingIndex = prevState.findIndex((item) => item.index === index);

      if (existingIndex !== -1) {
        // If it exists, update the item with the new values
        const updatedItem = {
          ...prevState[existingIndex],

          teamId: teamId,
        };

        // Create a new array with the updated item
        const newArray = [...prevState];
        newArray[existingIndex] = updatedItem;

        return newArray;
      } else {
        // If it doesn't exist, add a new item to the array
        const newItem = {
          index: index,
          teamId: teamId,
        };

        return [...prevState, newItem];
      }
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-7">
          <form onSubmit={handleSubmit}>
            <table
              border="0"
              cellPadding="0"
              cellSpacing="0"
              style={{ width: "100%" }}
              id="picksheetTable"
            >
              <tbody>
                <tr>
                  <td>
                    <div className="row">
                      <div className="col-6 text-center col-label">Away</div>
                      <div className="col-6 text-center col-label">Home</div>
                    </div>
                  </td>
                </tr>

                {sortedMatches.map((match, index) => {
                  let tempLastDate = lastDate;

                  const isNewDate = match.dateString !== tempLastDate;
                  if (isNewDate) {
                    tempLastDate = match.dateString;
                    lastDate = tempLastDate;
                  }

                  return (
                    <>
                      {isNewDate && (
                        <tr key={match.dateString}>
                          <td>
                            <div className="day">
                              {matchData && matchData.length > 0 ? (
                                <div className="day">{match.dateString}</div>
                              ) : (
                                <div>No matches available</div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}

                      <tr>
                        <td>
                          <div
                            key={match.team2Id}
                            id={"box" + `${match.team2Id}`}
                            className={`homeBox ${
                              selected.some(
                                (element) => element.teamId === match.team2Id
                              )
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => handleDivClick(index, match.team2Id)}
                          >
                            <table cellSpacing="0" cellPadding="0">
                              <tbody>
                                <tr>
                                  <td>
                                    <input
                                      type="radio"
                                      name={index}
                                      value={match.team2Id}
                                      onChange={() =>
                                        handleSelection(index, match.team2Id)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <TeamLogo
                                      className="h"
                                      teamId={match.team2Id}
                                    ></TeamLogo>
                                  </td>
                                  <td>
                                    <span className="teamName">
                                      {match.team2}
                                    </span>
                                    <span className="teamAbbr">
                                      {match.team2Abbr}
                                    </span>
                                    <span className="teamRecord">
                                      ({match.record2})
                                    </span>
                                    <span className="teamLocation">Home</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div
                            key={match.team1Id}
                            id={"box" + `${match.team1Id}`}
                            onClick={() => handleDivClick(index, match.team1Id)}
                            className={`homeBox ${
                              selected.some(
                                (element) => element.teamId === match.team1Id
                              )
                                ? "selected"
                                : ""
                            }`}
                          >
                            <table cellSpacing="0" cellPadding="0">
                              <tbody>
                                <tr>
                                  <td>
                                    <input
                                      type="radio"
                                      name={index}
                                      value={match.team1Id}
                                      onClick={() =>
                                        handleSelection(index, match.team1Id)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <TeamLogo
                                      className="h"
                                      teamId={match.team1Id}
                                    ></TeamLogo>
                                  </td>
                                  <td>
                                    <span className="teamName">
                                      {match.team1}
                                    </span>
                                    <span className="teamAbbr">
                                      {match.team1Abbr}
                                    </span>
                                    <span className="teamRecord">
                                      ({match.record1})
                                    </span>
                                    <span className="teamLocation">Away</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                        <div style={{ display: "none" }}>{indexCounter++}</div>
                      </tr>
                    </>
                  );
                })}

                <tr>
                  <td colSpan="3" align="center" style={{ paddingTop: "15px" }}>
                    <strong>
                      Tiebreak (combined points in{" "}
                      {matchData[matchData.length - 1]
                        ? matchData[matchData.length - 1].team1
                        : ""}
                      /
                      {matchData[matchData.length - 1]
                        ? matchData[matchData.length - 1].team2
                        : ""}
                      )
                    </strong>
                    :
                    <input
                      onChange={tiebreakHandler}
                      id="tiebreak"
                      type="text"
                      className="form-control"
                      style={{
                        display: "inline-block",
                        width: "60px",
                        textAlign: "center",
                      }}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" align="center">
                    <span className="black8">&nbsp;</span>
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" align="center">
                    <input
                      id="btnSubmit"
                      type="submit"
                      className="btn btn-danger"
                      value="Submit Your Picks"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <br></br>
            <br></br>
          </form>
        </div>
        <div
          className="col-md-4 offset-md-1"
          style={{
            border: "1px solid #eaeaea",
            borderRadius: "6px",
            paddingTop: "10px",
          }}
        >
          <h3 style={{ marginTop: "0px" }}>Instructions</h3>
          <ul
            style={{ paddingLeft: "0px", marginLeft: "15px" }}
            className="rules"
          >
            <li>Make your picks by clicking on a team</li>
            <li>
              Please submit all picks before the first game of the week (a
              partial picksheet can not be submitted).
            </li>
            <li>
              This week's final pick deadline is{" "}
              <strong>{deadlineDates[1]}</strong>. After this no picks can be
              entered/modified.
            </li>

            <li>
              Picks are made straight up (not using the spread), however some
              members find the point spreads useful in making their picks.{" "}
              <a style={{ fontWeight: "bold" }}>
                {" "}
                View this weeks point spreads
              </a>
              .
            </li>

            <li>
              You must click the submit button for your picks to be saved.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default ApiTest;
