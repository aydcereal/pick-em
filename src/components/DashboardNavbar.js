import DashboardLinks from "./DashboardLinks";
import AuthContext from "../context/auth-context";
import { useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect } from "react";
import { useContext } from "react";
import arrow from "../images/down_arrow.png";
import FlyoutMenu from "./FlyoutMenu";
import { NavLink } from "react-router-dom";
import logo from "../images/logos/blackLogo.png";
import classes from "./DashboardNavbar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const db = getDatabase();

const getUserData = (userId, callback) => {
  const userRef = ref(db, `users/${userId}`);
  onValue(userRef, (snapshot) => {
    const userData = snapshot.val();
    callback(userData);
  });
};

const DashboardNavbar = ({
  logoutHandler,
  handleLogout,
  shouldHide,
  handleFlyoutMenuClick,
}) => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    if (currentUser) {
      getUserData(currentUser.uid, setUserData);
    }
  }, [currentUser]);

  return (
    <div className="AppHeader__HeaderWrapper">
      <div className="Container__HeaderContainer">
        <div className="Container__HeaderContent">
          <div className="Container__HeaderLeftSlot">
            <NavLink to="/">
              <img className="navLogo" src={logo} />
            </NavLink>
          </div>
          <div className="Container__HeaderMiddleSlot">
            <DashboardLinks />
          </div>
          <div
            onClick={handleFlyoutMenuClick}
            className="Container__HeaderRightSlot"
          >
            <div className="UserPanel__UserPanelContainer">
              <span className="MediaQuery__DesktopAndTablet">
                <a className="userMenu">
                  <span>{userData.displayName}</span>
                  <img src={arrow} />
                </a>
              </span>
            </div>

            <span className="MediaQuery__MobileOnly">
              <button className="components__UserMenuTriggerMobile">
                <FontAwesomeIcon
                  className="icon"
                  icon={faUser}
                  style={{ color: "#fafafa" }}
                />
              </button>
            </span>

            <FlyoutMenu
              handleLogout={handleLogout}
              logoutHandler={logoutHandler}
              shouldHide={shouldHide}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
