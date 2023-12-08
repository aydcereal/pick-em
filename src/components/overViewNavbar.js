import AuthContext from "../context/auth-context";
import { useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logos/blackLogo.png";
import classes from "./overViewNavbar.css";
import arrow from "../images/down_arrow.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import FlyoutMenu from "./FlyoutMenu";

const db = getDatabase();

const getUserData = (userId, callback) => {
  const userRef = ref(db, `users/${userId}`);
  onValue(userRef, (snapshot) => {
    const userData = snapshot.val();
    callback(userData);
  });
};

const OverViewNavbar = ({
  onLogout,
  logoutHandler,
  shouldHide,
  handleFlyoutMenuClick,
  handleLogout,
}) => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    if (currentUser) {
      getUserData(currentUser.uid, setUserData);
    }
  }, [currentUser]);

  return (
    <header className="navbar navbar-expand-lg navbar-light">
      <div className="container-wrapper">
        <div className="container branding-standard navbanner-container">
          <div className="branding">
            <NavLink to={"/"}>
              <img className="navLogo" src={logo} />
            </NavLink>
          </div>
          <div className="superNav">
            <NavLink className="superNavItem">Dashboard</NavLink>
            <NavLink className="superNavItem">Connections</NavLink>
          </div>
          <div className="top-navigation">
            <button className="navbar-toggler" type="button">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="authentication logged-in"
              onClick={handleFlyoutMenuClick}
            >
              <a
                className="btn btn-plain btn-md dropdown-toggle"
                id="usernameDropdown"
              >
                <FontAwesomeIcon
                  className="fas fa-user d-inline-block d-lg-none"
                  icon={faUser}
                  style={{ color: "#212529" }}
                />
                <span className="d-none d-lg-inline-block">
                  {userData.displayName}
                </span>
              </a>
              <FlyoutMenu
                handleLogout={handleLogout}
                logoutHandler={logoutHandler}
                shouldHide={shouldHide}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default OverViewNavbar;
