import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbars/navbar";
import { useNavigate } from "react-router-dom";
import { setShowAlert, setShouldHideAlert } from "../redux/store";
import { useDispatch } from "react-redux";
import SignoutAlert from "../components/SignoutAlert";
import AuthContext from "../context/auth-context";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import DashboardNavbar from "../components/Navbars/DashboardNavbar";
import OverViewNavbar from "../components/Navbars/OverViewNavbar";
import { useState } from "react";

export default function Root() {
  const { isAuthenticated, handleLogout } = useContext(AuthContext);
  const [shouldHide, setShouldHide] = useState(true);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isOverView =
    location.pathname.startsWith("/Overview") ||
    location.pathname.startsWith("/picks");

  const navigate = useNavigate();

  const handleFlyoutMenuClick = () => {
    setShouldHide(!shouldHide);
  };

  const dispatch = useDispatch();

  const logoutHandler = () => {
    console.log("Log out handler called");
    navigate("/");
    dispatch(setShowAlert(true));
    dispatch(setShouldHideAlert(false));
    setTimeout(() => {
      dispatch(setShowAlert(false));
      setTimeout(() => dispatch(setShouldHideAlert(true)), 5000);
    }, 5000);
  };

  return (
    <>
      <SignoutAlert />
      {isOverView ? (
        <OverViewNavbar
          logoutHandler={logoutHandler}
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
          shouldHide={shouldHide}
          handleFlyoutMenuClick={handleFlyoutMenuClick}
        />
      ) : !isDashboard ? (
        <Navbar
          logoutHandler={logoutHandler}
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
          shouldHide={shouldHide}
          handleFlyoutMenuClick={handleFlyoutMenuClick}
        />
      ) : (
        <DashboardNavbar
          logoutHandler={logoutHandler}
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
          shouldHide={shouldHide}
          handleFlyoutMenuClick={handleFlyoutMenuClick}
        />
      )}

      <Outlet />
    </>
  );
}
