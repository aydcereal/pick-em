import React, { useEffect, useState } from "react";
import ProgressCircle from "../components/ProgressCircle";
import "@fortawesome/fontawesome-free/css/all.css";
import classes from "./picks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import TeamData from "./TeamData";
import TeamLogo from "../components/TeamLogo";
import useQuerySelections from "../components/useQuerySelections";
import { useParams } from "react-router-dom";
import styles from "../components/ManageEntries.module.css";

const Picks = () => {
  const [matchData, setMatchData] = useState([]);
  const [selections, setSelections] = useState([]);
  const [matchingWeek, setMatchingWeek] = useState(false);
  const [currentSelectedWeek, setCurrentSelectedWeek] = useState(1);
  // const { poolId } = useParams();
  const poolId = "-Nj4tuMgXtDwNh8BH2Cp"; // Temp
  const weeks = Array.from({ length: 18 }, (_, index) => `Week ${index + 1}`);

  useEffect(() => {
    TeamData(1).then((data) => {
      setMatchData(data);
    });
  }, []);

  const updateStatesFromQuery = (
    selections,
    matchingWeek,
    currentSelectedWeek
  ) => {
    setSelections(selections);
    setMatchingWeek(matchingWeek);
    setCurrentSelectedWeek(currentSelectedWeek);
  };

  useQuerySelections(updateStatesFromQuery, poolId, setCurrentSelectedWeek);

  console.log(selections);

  return (
    <div className="content-area">
      <div className="container">
        <div className="wholeWrapper">
          <div className="stickyLeftWrapper">
            <h1>POOL MEMBERS' PICKS FOR WEEK 10 </h1>
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
                    <select className="form-select" name="week" id="week">
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
                    Select a week:
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
                <tr>
                  <td className="sticky headcell" width="100">
                    <span className="n">
                      <b>Jordy Figueroa</b>
                    </span>
                    <span className="pts">9 Points</span>
                  </td>
                  {selections.map((item, index) => (
                    <td>
                      <span className={styles.p}>
                        <TeamLogo teamId={item} />
                      </span>
                    </td>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Picks;
