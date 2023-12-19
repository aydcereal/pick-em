import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/auth-context";
import { app } from "../firebase";
import "firebase/compat/database";
import styles from "./ManageEntries.module.css";
import { useParams } from "react-router-dom";
import TeamLogo from "../components/TeamLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { getCurrentWeek } from "../components/Calendar";
import cutOffDates from "../components/cutOffDates";
import FlyoutPoolSettings from "../components/Flyouts/FlyoutPoolSettings";
import { set } from "firebase/database";

const ManageEntries = () => {
  const [selections, setSelections] = useState([]);
  const [matchingWeek, SetMachingWeek] = useState(false);
  const [currentSelectedWeek, SetCurrentSelectedWeek] = useState();
  const [playerName, setplayerName] = useState("");
  const [deadlineDates, setDeadlineDates] = useState([]);
  const { poolId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [showFlyout, setShowFlyout] = useState(false);
  const userId = currentUser ? currentUser.uid : null;

  const weeks = Array.from({ length: 18 }, (_, index) => `Week ${index + 1}`);

  const handleFlyoutMenuClick = (type) => {
    console.log("handleFlyoutMenuClick", type._reactName);
    if (type._reactName === "onBlur") {
      console.log("onBlur");
      setShowFlyout(false);
    }
    if (type._reactName == "onClick") {
      setShowFlyout(!showFlyout);
    }
  };

  useEffect(() => {
    SetCurrentSelectedWeek(getCurrentWeek());
  }, []);

  useEffect(() => {
    console.log(currentSelectedWeek);

    const getCutOffDates = async () => {
      const dates = await cutOffDates(currentSelectedWeek);
      setDeadlineDates(dates);
    };

    getCutOffDates();
  }, [currentSelectedWeek]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const database = app.database();

    const dataRef = database.ref(
      `selections/${poolId}/Week ${currentSelectedWeek}`
    );
    dataRef.on("value", (snapshot) => {
      const dataObject = snapshot.val();
      if (dataObject) {
        const userData = Object.values(dataObject).find(
          (item) =>
            item.userId === userId &&
            item.poolKey === poolId &&
            item.week === parseInt(currentSelectedWeek)
        );
        console.log(userData);
        if (userData) {
          setplayerName(userData.playerName);
          setSelections(userData.selections || []);
          SetMachingWeek(true);
        } else {
          SetMachingWeek(false);
        }
      } else {
        SetMachingWeek(false);
      }
    });
  }, [currentSelectedWeek, currentUser, userId, poolId]);

  return (
    <div className="content-area">
      <div className="container">
        <h1>Manage Entries</h1>
        <p className={styles.managinEntries_p}>
          Make your picks for each entry below. The first game for week{" "}
          {currentSelectedWeek} starts <strong>{deadlineDates[0]}</strong> You
          can modify your other picks up until the final pick deadline on{" "}
          <strong>{deadlineDates[1]}</strong>
        </p>

        <div className={`row ${styles.entries}`}>
          <div className="col-md-12">
            <table className="table-responsive">
              <tbody>
                <tr className="headerRow">
                  <th className={`col-md-2 vert-align ${styles.entry}`}>
                    Entry
                  </th>
                  <th className="col-md-7 vert-align text-center pickCell">
                    <select
                      className={styles.form_select}
                      name="picks"
                      id="picks"
                      value={currentSelectedWeek}
                      onChange={(e) => {
                        SetCurrentSelectedWeek(e.target.value);
                      }}
                    >
                      {weeks.map((week, index) => (
                        <option key={index} value={index + 1}>
                          {week}
                        </option>
                      ))}
                    </select>
                    <span style={{ marginLeft: "5px" }}>Picks</span>
                  </th>

                  <th></th>
                </tr>
                {(matchingWeek && (
                  <tr className={styles.pickRow}>
                    <td className={`col-md-2 vert-align ${styles.entry}`}>
                      <div>{playerName}</div>
                    </td>
                    <td className="col-md-7 vert-align text-center pickCell">
                      {selections.map((item, index) => (
                        <span className={styles.team}>
                          <TeamLogo imgclass={styles.team} teamId={item} />
                        </span>
                      ))}
                    </td>
                    <td className="cold-md-1 text-center vert-align d-none">
                      <span className={styles.statusAlive}>0-0</span>
                    </td>
                    <td className="col-md-1 text-center vert-align">
                      <div className="btn-group">
                        <button
                          type="button"
                          id="btnGroupOptions"
                          class="btn btn-default"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          onClick={handleFlyoutMenuClick}
                        >
                          <FontAwesomeIcon
                            className="far fa-ellipsis-v fa-2x"
                            icon={faEllipsisVertical}
                          />
                        </button>
                        <FlyoutPoolSettings
                          poolId={poolId}
                          currentSelectedWeek={currentSelectedWeek}
                          show={showFlyout}
                        />
                      </div>
                    </td>
                  </tr>
                )) || (
                  <tr className={styles.pickRow}>
                    <td className={`col-md-2 vert-align ${styles.entry}`}>
                      <div>{playerName} </div>
                    </td>
                    <td className="col-md-7 vert-align text-center pickCell">
                      <a
                        href={`/pools/${poolId}/${currentSelectedWeek}`}
                        class="btn btn-danger"
                      >
                        <FontAwesomeIcon
                          className="far fa-pencil pe-2 d-none d-md-inline"
                          icon={faPencil}
                        />
                        Make Your Picks
                      </a>
                    </td>

                    <td className="col-md-1 text-center vert-align">
                      <div className="btn-group">
                        <button
                          type="button"
                          id="btnGroupOptions"
                          class="btn btn-default"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        ></button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageEntries;
