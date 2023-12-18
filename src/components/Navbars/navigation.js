import Navlinks from "./navLinks";
import { NavLink, useNavigate } from "react-router-dom";

import { getDatabase, ref, onValue } from "firebase/database";

const db = getDatabase();

const getUserData = (userId, callback) => {
  const userRef = ref(db, `users/${userId}`);
  onValue(userRef, (snapshot) => {
    const userData = snapshot.val();
    callback(userData);
  });
};

const Navigation = ({ isAuthenticated, onLogout, logoutHandler }) => {
  return (
    <div className="navigation">
      <div className="authentication logged-in">
        {isAuthenticated ? (
          <NavLink
            className="btn btn-lg btn-danger nav-btn btn-dash"
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        ) : (
          <NavLink className="btn btn-lg btn-danger nav-btn" to="/login">
            Login
          </NavLink>
        )}
      </div>

      <div className="collapse navbar-collapse">
        <Navlinks />
      </div>
    </div>
  );
};

export default Navigation;
