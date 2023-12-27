import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import classes from "./Leaderboard.css";

const Leaderboard = () => {
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
                  <tr className="row">
                    <th
                      aria-controls="ytdTable"
                      className="sorting_asc"
                      style={{
                        maxWidth: "30px",
                        paddingLeft: "5px",
                        width: "30px",
                      }}
                    >
                      Rank
                    </th>
                    <th
                      className="n sorting_asc"
                      aria-controls="ytdTable"
                      aria-label="Entry Name: activate to sort column descending"
                      style={{ width: "125px" }}
                    >
                      Entry Name
                    </th>
                    <th>Pts</th>
                    <th>W</th>
                    <th>L</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="row">
                    <td>1</td>
                    <td>Jordy Figueroa</td>
                    <td>120</td>
                    <td>120</td>
                    <td>50</td>
                  </tr>
                </tbody>
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
