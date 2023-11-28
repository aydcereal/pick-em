import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/auth-context";
import { app } from "../firebase";
import "firebase/compat/database";
import styles from "./ManageEntries.module.css";
import { useParams } from "react-router-dom";
import TeamLogo from "./TeamLogo";

const LoadingState = () => {
  return (
    <div>
      <h2>Loading...</h2>
    </div>
  );
};

const ManageEntries = () => {
  const [selections, setSelections] = useState([]);
  const [matchingWeek, SetMachingWeek] = useState(false);
  const [currentSelectedWeek, SetCurrentSelectedWeek] = useState(1);
  const [fullName, setFullName] = useState("");
  const { poolId } = useParams();
  const { currentUser } = useContext(AuthContext);

  const userId = currentUser ? currentUser.uid : "null";

  const weeks = Array.from({ length: 18 }, (_, index) => `Week ${index + 1}`);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const database = app.database();

    const dataRef = database.ref("selections");
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
          setFullName(userData.fullName);
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
          Make your picks for each entry below. The first game for week 9 starts
          Thursday,
          <b>November 2 at 8:15 PM ET.</b> You can modify your other picks up
          until the final pick deadline on Sunday, November 5 at 1:00 PM ET.
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
                  <th className="d-none d-md-table-cell">Record W-L</th>
                  <th></th>
                </tr>
                {(matchingWeek && (
                  <tr className={styles.pickRow}>
                    <td className={`col-md-2 vert-align ${styles.entry}`}>
                      <div>{fullName}</div>
                    </td>
                    <td className="col-md-7 vert-align text-center pickCell">
                      {selections.map((item, index) => (
                        <span className={styles.team}>
                          <TeamLogo imgclass={styles.team} teamId={item} />
                        </span>
                      ))}
                    </td>
                    <td className="cold-md-1 text-center vert-align">
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
                        >
                          <span className={styles.statusAlive}>0-0</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )) || (
                  <tr className={styles.pickRow}>
                    <td className={`col-md-2 vert-align ${styles.entry}`}>
                      <div>{fullName} </div>
                    </td>
                    <td className="col-md-7 vert-align text-center pickCell">
                      <a
                        href={`/pools/${poolId}/${currentSelectedWeek}`}
                        class="btn btn-danger"
                      >
                        <i className="far fa-pencil pe-1 d-none d-md-inline"></i>
                        Make Your Picks
                      </a>
                    </td>
                    <td className="cold-md-1 text-center vert-align">
                      <span className="statusAlive">0-0</span>
                    </td>
                    <td className="col-md-1 text-center vert-align">
                      <div className="btn-group">
                        <button
                          type="button"
                          id="btnGroupOptions"
                          class="btn btn-default"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span className="far fa-ellipsis-v fa-2x"></span>
                        </button>
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
