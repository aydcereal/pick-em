import DashboardLinks from "../DashboardLinks";
import AuthContext from "../../context/auth-context";
import { useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect } from "react";
import { useContext } from "react";
import arrow from "../images/down_arrow.png";
import FlyoutMenu from "./FlyoutMenu";

const db = getDatabase();

const getUserData = (userId, callback) => {
  const userRef = ref(db, `users/${userId}`);
  onValue(userRef, (snapshot) => {
    const userData = snapshot.val();
    callback(userData);
  });
};

const DashboardNavigation = ({ onLogout, logoutHandler }) => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState("");
  const [shouldHide, setShouldHide] = useState(true);

  useEffect(() => {
    if (currentUser) {
      getUserData(currentUser.uid, setUserData);
    }
  }, [currentUser]);

  const handleFlyoutMenuClick = () => {
    setShouldHide(!shouldHide);
  };

  return (
    <div className="navigation">
      <div className="authentication logged-in">
        <div>
          <div>
            <a className="userMenu">
              <span onClick={handleFlyoutMenuClick}>
                {userData.displayName}
              </span>
              <img src={arrow} />
            </a>
          </div>
          <FlyoutMenu
            onLogout={onLogout}
            logoutHandler={logoutHandler}
            shouldHide={shouldHide}
          />
        </div>
      </div>
      <div className="collapse navbar-collapse">
        <DashboardLinks />
      </div>
    </div>
  );
};

export default DashboardNavigation;
