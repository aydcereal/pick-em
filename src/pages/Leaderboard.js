import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import ytdData from "../components/ytdData";
import classes from "./Leaderboard.css";
import { useState, useEffect } from "react";

const Leaderboard = () => {
  const [ytdScores, setYtdScores] = useState([]);

  const [selectedColumn, setSelectedColumn] = useState(null);

  const handleColumnClick = (columnName) => {
    setSelectedColumn(columnName);
  };

  useEffect(() => {
    const fetchMatchData = async () => {
      const scores = await ytdData();
      setYtdScores(scores);
    };
    fetchMatchData();
  }, []);

  console.log(ytdScores);
  return (
    <div className="content-area">
      <div className="container">
        <div className="row">
          <h1 style={{ display: "block" }}>Leaderboard</h1>
          <div className="optionsPanel">
            <a
              id="advOptionsBtn"
              className="float-end btn btn-outline-danger mb-3"
            >
              &nbsp;&nbsp;Scores & Projections
            </a>
            <div
              className="float-end btn btn-outline-danger mb-3"
              style={{ marginRight: "15px", marginTop: "15px" }}
            >
              <a>
                <FontAwesomeIcon icon={faFileExcel} />
                &nbsp;&nbsp;Export
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-6 pe-lg-5">
              <h3>Year-to-Date Leaderboard</h3>
              <table
                id="ytdTable"
                className="display dataTable no-footer"
                style={{
                  width: "100%",
                }}
              >
                <thead>
                  <tr role="row">
                    <th
                      aria-controls="ytdTable"
                      className={
                        selectedColumn === "Rank" ? "sorting_asc" : "sorting"
                      }
                      style={{
                        maxWidth: "30px",
                        paddingLeft: "5px",
                        width: "30px",
                      }}
                      onClick={() => handleColumnClick("Rank")}
                    >
                      Rank
                    </th>
                    <th
                      className={
                        selectedColumn === "Entry Name"
                          ? "sorting_asc"
                          : "sorting"
                      }
                      aria-controls="ytdTable"
                      aria-label="Entry Name: activate to sort column descending"
                      style={{ width: "125px" }}
                      onClick={() => handleColumnClick("Entry Name")}
                    >
                      Entry Name
                    </th>
                    <th
                      className={
                        selectedColumn === "pts" ? "sorting_asc" : "sorting"
                      }
                      aria-controls="ytdTable"
                      aria-label="Pts: activate to sort column descending"
                      style={{ width: "50px" }}
                      onClick={() => handleColumnClick("pts")}
                    >
                      Pts
                    </th>
                    <th
                      className={
                        selectedColumn === "w" ? "sorting_asc" : "sorting"
                      }
                      aria-controls="ytdTable"
                      aria-label="W: activate to sort column descending"
                      style={{ width: "50px" }}
                      onClick={() => handleColumnClick("w")}
                    >
                      W
                    </th>
                  </tr>
                </thead>

                {console.log(ytdScores, "scores")}

                <tbody>
                  {ytdScores &&
                    ytdScores.map((item, index) => {
                      return (
                        <tr role="row" className={index % 2 ? "odd" : "even"}>
                          <td aria-controls="ytdTable">{index + 1}</td>
                          <td
                            aria-controls="ytdTable"
                            aria-label="Entry Name: activate to sort column descending"
                          >
                            {item.name}
                          </td>
                          <td aria-controls="ytdTable">{item.totalPoints}</td>
                          <td aria-controls="ytdTable">{item.totalPoints}</td>
                        </tr>
                      );
                    })}
                </tbody>
                {/* <tr role="row" className="odd">
                  <td aria-controls="ytdTable">1</td>
                  <td
                    aria-controls="ytdTable"
                    aria-label="Entry Name: activate to sort column descending"
                  >
                    Jordy Figueroa
                  </td>
                  <td aria-controls="ytdTable">120</td>
                  <td aria-controls="ytdTable">120</td>
                  <td aria-controls="ytdTable">50</td>
                </tr> */}
              </table>
            </div>
            <div className="col-12 col-lg-6 pe-lg-5">
              <h3>Week 16 Results</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
