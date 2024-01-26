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
import styles from "./ManageEntries.module.css";
import { SelectionData, getEntries } from "../components/selectionData";
import { TeamData } from "./TeamData";
import { getCurrentWeek } from "../components/Calendar";
import matchesOver from "../components/matchesOver";
import VictoryResolver from "../components/VictoryResolver";

import { app } from "../firebase";
import "firebase/compat/database";

const Picks = () => {
  const MemoizedTeamLogo = React.memo(TeamLogo);
  const [matchData, setMatchData] = useState([]);
  const [selections, setSelections] = useState([]);
  const [week, setWeek] = useState();

  const [points, setPoints] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [sortedUsersData, setSortedUsersData] = useState([]);
  const [allMatchesOver, setAllMatchesOver] = useState();
  const [sort, setSort] = useState(1);
  const [activeEntries, setActiveEntries] = useState({});
  const [picksIn, setPicksIn] = useState({});
  const [picksInNames, setPicksInNames] = useState();
  const { poolKey } = useParams();

  const currentWeek = getCurrentWeek();

  const database = app.database();
  const selectionRef = database.ref(`selections/${poolKey}/Week ${week}`);
  selectionRef.orderByChild("poolKey").equalTo(poolKey);

  console.log(selectionRef);
  selectionRef.once("value", (snapshot) => {
    const dataObject = snapshot.val();
    console.log(dataObject);
  });

  useEffect(() => {
    setWeek(currentWeek);
  }, [currentWeek]);

  useEffect(() => {
    matchesOver(week).then((data) => {
      setAllMatchesOver(data);
    }, []);
  }, [week]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const entriesData = await getEntries(poolKey, week);
      if (isMounted) {
        setActiveEntries(entriesData.membersCount);
        setPicksInNames(entriesData.activeSelections);
        setPicksIn(entriesData.totalSelections);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // cleanup function
    };
  }, [poolKey, week]);

  useEffect(() => {
    const fetchData = async () => {
      const [matchData, selectionsData] = await Promise.all([
        TeamData(week),
        SelectionData(week, poolKey),
      ]);

      setMatchData(matchData);

      setSelections(selectionsData);
    };

    fetchData();
  }, [week, poolKey]);

  useEffect(() => {
    console.log(selections);
    const newUsersData = selections.map((item) => {
      console.log(item);
      const playerName = item.playerName ? item.playerName : item.fullName;

      const tiebreakValue = item.tiebreakValue;

      let selectionObject = 0; // Initialize with a default value
      item.selections.forEach((selection) => {
        const resultItem = matchData.results.find(
          (result) => result.id === selection.toString()
        );
        const isWinner = resultItem ? resultItem.winner : false;
        if (isWinner) {
          selectionObject = selectionObject + 1;
        }
      });

      const key = `${playerName}_${item.poolKey}_${item.week}`;
      console.log(key);

      const playerData = {
        playerName,
        tiebreakValue,
        selections: item.selections,
        wins: selectionObject,
      };

      selectionRef.child(key).update(playerData);

      return playerData;
    });

    setUsersData(newUsersData);
    console.log(newUsersData);
  }, [selections, matchData]);

  const championData = VictoryResolver(usersData, matchData.mondayScores);

  const sortPicksHandler = (event) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    const newPoints = selections.map((item) => {
      const playerName = item.playerName ? item.playerName : item.fullName;
      let selectionObject = 0; // Initialize with a default value
      item.selections.forEach((selection) => {
        const resultItem = matchData.results.find(
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
  }, [selections, matchData]);

  const weeks = Array.from({ length: 18 }, (_, index) => `Week ${index + 1}`);

  const sortPicks = () => {
    if (sort == 3) {
      const sortedData = [...championData].sort((a, b) => b.wins - a.wins);
      setSortedUsersData(sortedData);
    } else if (sort == 1) {
      const sortedData = [...championData].sort((a, b) =>
        a.playerName.localeCompare(b.playerName)
      );

      setSortedUsersData(sortedData);
    }
  };

  useEffect(() => {
    sortPicks();
  }, [sort, usersData]);

  if (picksIn > activeEntries) {
    setActiveEntries(picksIn);
  }

  const progressIn = (picksIn / activeEntries) * 100;

  const progressNotIn =
    activeEntries - picksIn !== 0
      ? ((activeEntries - picksIn) / activeEntries) * 100
      : 0;

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
                value={typeof activeEntries === "number" ? activeEntries : ""}
              ></ProgressCircle>
              <ProgressCircle
                progress={progressIn ? progressIn : 0}
                gradientColor={"green"}
                id={"green"}
                title={`Week ${week} Picks in`}
                action={"View members with picks"}
                value={typeof picksIn === "number" ? picksIn : ""}
              ></ProgressCircle>
              <ProgressCircle
                progress={progressNotIn ? progressNotIn : 0}
                gradientColor={"red"}
                id={"red"}
                title={`Week ${week} Picks not in`}
                action={"View members without picks"}
                value={
                  typeof activeEntries === "number"
                    ? activeEntries - picksIn
                    : ""
                }
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
                            {item.champion && allMatchesOver ? (
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
                        const resultItem = matchData.results.find(
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
                            <MemoizedTeamLogo teamId={teamId} type={"picks"} />
                          </td>
                        );
                      })}
                      <td className="tie">
                        {item.tieBreakValue}
                        <span className="tb">
                          ({item.tieBreakValue - matchData.mondayScores})
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
