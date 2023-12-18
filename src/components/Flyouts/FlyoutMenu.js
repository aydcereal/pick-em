import DashboardLinks from "../DashboardLinks";
import AuthContext from "../../context/auth-context";
import { useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import {
  OuterContainer,
  MidContainer,
  InnerContainer,
  FlyoutHeader,
  FlyoutTitle,
  FlyoutActionsWrapper,
} from "./FlyoutMenu.styled";

const db = getDatabase();

const getUserData = (userId, callback) => {
  const userRef = ref(db, `users/${userId}`);
  onValue(userRef, (snapshot) => {
    const userData = snapshot.val();
    callback(userData);
  });
};

const FlyoutMenu = ({ handleLogout, logoutHandler, shouldHide }) => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState("");

  const handleClick = () => {
    logoutHandler();
    handleLogout();
  };

  useEffect(() => {
    if (currentUser) {
      getUserData(currentUser.uid, setUserData);
    }
  }, [currentUser]);

  return (
    <OuterContainer className={shouldHide ? "Hidden" : ""}>
      <MidContainer>
        <InnerContainer>
          {userData && (
            <FlyoutHeader>
              <FlyoutTitle>{userData.displayName}</FlyoutTitle>
              <FlyoutActionsWrapper>
                <Link to="/edit-account">Edit account</Link>
                <Link onClick={handleClick}>Sign Out</Link>
              </FlyoutActionsWrapper>
            </FlyoutHeader>
          )}
        </InnerContainer>
      </MidContainer>
    </OuterContainer>
  );
};

export default FlyoutMenu;
