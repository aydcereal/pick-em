import { NavLink } from "react-router-dom";
import classes from "./overViewNavbar.css";
import { useState } from "react";

const NavbarDropDown = ({ isHidden }) => {
  console.log(isHidden);

  return (
    <div
      id="navbarDropdown"
      className={`container-nav  navbar-collapse collapse ${
        !isHidden ? "show" : ""
      }`}
    >
      <ul className="nav pool-nav-tabs navbar-nav">
        <li role="presentation" className="tab-item">
          <NavLink className={"nav-link active"} to={"/"}>
            Overview
          </NavLink>
        </li>
        <li role="presentation" className="tab-item">
          <NavLink className={"nav-link active"} to={"/"}>
            Your Picks
          </NavLink>
        </li>
        <li role="presentation" className="tab-item">
          <NavLink className={"nav-link active"} to={"/"}>
            Commissioner Console
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavbarDropDown;
