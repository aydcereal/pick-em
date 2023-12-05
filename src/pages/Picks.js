import React, { useEffect, useState } from "react";
import ProgressCircle from "../components/ProgressCircle";
import "@fortawesome/fontawesome-free/css/all.css";
import classes from "./picks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faFileExcel,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";
import TeamLogo from "../components/TeamLogo";
import { useParams } from "react-router-dom";
import styles from "../components/ManageEntries.module.css";
import SelectionData from "../components/selectionData";
import TeamData from "./TeamData";
import { getCurrentWeek } from "../components/Calendar";

const Picks = () => {
  const [matchData, setMatchData] = useState([]);
  const [selections, setSelections] = useState([]);
  const [week, setWeek] = useState(1);
  const [results, setResults] = useState([]);
  const [points, setPoints] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [sortedUsersData, setSortedUsersData] = useState([]);
  const [sort, setSort] = useState(1);
  const [mNScores, setMNScores] = useState();
  const { poolKey } = useParams();
  let isChampion = false;

  console.log(week);
  useEffect(() => {
    setWeek(getCurrentWeek());
  }, []);

  console.log(week);

  useEffect(() => {
    console.log("newUsersData");
    const newUsersData = selections.map((item) => {
      const playerName = item.playerName ? item.playerName : item.fullName;

      const tieBreakValue = item.tiebreakValue;

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

      return {
        playerName,
        tieBreakValue,
        selections: item.selections,
        wins: selectionObject,
      };
    });

    setUsersData(newUsersData);
  }, [selections, results]);

  const sortPicksHandler = (event) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    const newPoints = selections.map((item) => {
      const playerName = item.playerName ? item.playerName : item.fullName;
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
  console.log(points);

  const weeks = Array.from({ length: 18 }, (_, index) => `Week ${index + 1}`);

  useEffect(() => {
    TeamData(week).then((data) => {
      setMatchData(data.matches);
      setResults(data.results);
      setMNScores(data.mondayScores);
      console.log(data);
    });

    SelectionData(week, poolKey).then((data) => {
      setSelections(data);
    });
  }, [week, poolKey]);

  const sortPicks = () => {
    if (sort == 3) {
      const sortedData = [...usersData].sort((a, b) => b.wins - a.wins);
      setSortedUsersData(sortedData);
    } else if (sort == 1) {
      const sortedData = [...usersData].sort((a, b) =>
        a.playerName.localeCompare(b.playerName)
      );
      setSortedUsersData(sortedData);
      console.log("setUsersData");
    }
  };

  useEffect(() => {
    sortPicks();
  }, [sort, usersData]);

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
                title={`Week ${week} Picks in`}
                action={"View members with picks"}
                value={1}
              ></ProgressCircle>
              <ProgressCircle
                progress={50}
                gradientColor={"red"}
                id={"red"}
                title={`Week ${week} Picks not in`}
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
                  </div>
                </form>
                <form className="row">
                  <label htmlFor="week" className="col-sm-4 col-form-label">
                    Sort picks by:
                  </label>
                  <div className="col-md-8" style={{ marginBottom: "10px" }}>
                    <select
                      onChange={sortPicksHandler}
                      className="form-select"
                      name="sort"
                      id="sort"
                    >
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

                  {matchData && matchData && matchData.length > 0 ? (
                    matchData.map((match, index) => {
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
                {sortedUsersData.map((item, rowIndex) => {
                  const pointItem = points.find((obj) =>
                    obj.hasOwnProperty(item.playerName)
                  );

                  const pointValue = pointItem ? pointItem[item.playerName] : 0;

                  return (
                    <tr key={rowIndex}>
                      <td className="sticky headcell" width="100">
                        <span className="n">
                          <b>
                            {item.playerName}{" "}
                            {isChampion ? (
                              <FontAwesomeIcon
                                icon={faCrown}
                                style={{ color: "#c7b43b" }}
                              />
                            ) : (
                              ""
                            )}
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
                      <td className="tie">
                        {item.tieBreakValue}
                        <span className="tb">
                          ({item.tieBreakValue - mNScores})
                        </span>
                      </td>
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
