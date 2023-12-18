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

const FlyoutMenu = ({ shouldHide, logoutHandler }) => {
  const { userData, handleLogout } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("");

  const handleClick = () => {
    logoutHandler();
    handleLogout();
  };

  useEffect(() => {
    if (userData) {
      setDisplayName(userData.displayName);
    }
  }, [userData]);

  return (
    <OuterContainer className={shouldHide ? "Hidden" : ""}>
      <MidContainer>
        <InnerContainer>
          {userData && (
            <FlyoutHeader>
              <FlyoutTitle>{displayName}</FlyoutTitle>
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
