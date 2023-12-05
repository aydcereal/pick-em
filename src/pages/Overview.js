import classes from "./overview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDesktop,
  faPencil,
  faListOl,
  faTasksAlt,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "../components/Calendar";
import { useParams } from "react-router-dom";
import { fetchPoolData } from "../components/fetchPoolData";
import { useEffect, useState } from "react";

const Overview = () => {
  const { poolKey } = useParams();
  const [poolName, setName] = useState();

  useEffect(() => {
    fetchPoolData(poolKey)
      .then((data) => {
        console.log("Fetched data:", data);
        setName(data.poolName);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [poolKey]);

  console.log(poolName);

  return (
    <div className="content-area">
      <div className="container">
        <div className="overview-title">
          <div className="league-name">
            <h1>{poolName}</h1>
          </div>
        </div>
        <div style={{ fontFamily: "Segoe UI, Arial", fontSize: "14px" }}>
          <div style={{ paddingTop: "15px", paddingBottom: "5px" }}>
            <div className="tag-box box-shadow shadow-effect-4">
              <div className="tag-box-header">Note From Pool Commissioner</div>
              <div className="tag-box-content">
                Welcome to my NFL Pick 'em Pool!
                <br></br>
                <br></br>A brief reminder: You must get your picks in by the
                weekly deadline - before the first game each Sunday, however if
                there is an early game you must pick ALL games before it starts.
                You can modify the remainder of the games up until the Sunday
                deadline. All picks will be hidden until the game has begun (for
                early games) or the until the first kickoff on Sunday. Good luck
                to everyone. If you have any questions, please contact me at
                jordyfigueroa93@icloud.com.
                <br></br>
                <br></br>
                -Jordy Figueroa
              </div>
            </div>
          </div>
          <div style={{ paddingTop: "5px", paddingBottom: "25px" }}>
            <div className="row">
              <div className="col-6 col-sm-6 col-md-2 col-lg-2">
                <div className="featuredBox">
                  <a href="" className="btn btn-default">
                    <FontAwesomeIcon
                      className="far fa-desktop fa-2x"
                      icon={faDesktop}
                    />

                    <div className="label">Commish Console</div>
                  </a>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-2 col-lg-2">
                <div className="featuredBox">
                  <a
                    href={`/selections/${poolKey}`}
                    className="btn btn-default"
                  >
                    <FontAwesomeIcon
                      className="far fa-desktop fa-2x"
                      icon={faPencil}
                    />
                    <div className="label">Make your picks</div>
                  </a>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-2 col-lg-2">
                <div className="featuredBox">
                  <a href="" className="btn btn-default">
                    <FontAwesomeIcon
                      className="far fa-desktop fa-2x"
                      icon={faListOl}
                    />
                    <div className="label">Leaderboard</div>
                  </a>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-2 col-lg-2">
                <div className="featuredBox">
                  <a href={`/picks/${poolKey}`} className="btn btn-default">
                    <FontAwesomeIcon
                      className="far fa-desktop fa-2x"
                      icon={faTasksAlt}
                    />
                    <div className="label">Members' Picks</div>
                  </a>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-2 col-lg-2">
                <div className="featuredBox">
                  <a href="" className="btn btn-default">
                    <FontAwesomeIcon
                      className="far fa-desktop fa-2x"
                      icon={faUserGroup}
                    />
                    <div className="label">Pool Entries</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-4 col-md-4">
              <div className="widgetBox">
                <div className="widgetHeader">Entry Count</div>
                <div className="widgetContent">
                  <div
                    className="row"
                    style={{ marginTop: "10px", marginBottom: "5px" }}
                  >
                    <div className="counters col-md-6">
                      2<h4>Total Entries</h4>
                    </div>
                    <div className="counters col-md-6">
                      1<h4>Entries with week 13 picks</h4>
                    </div>
                  </div>
                  <div style={{ padding: "5px", fontSize: "13px" }}>
                    Your pool members have indicated they would like 2 entries
                    in total. 1 of these 2 entries have picks entered.
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4">
              <div className="widgetBox">
                <Calendar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
