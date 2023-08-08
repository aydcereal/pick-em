import DashboardLinks from "./DashboardLinks";
import AuthContext from "../context/auth-context";
import { useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect } from "react";
import { useContext } from "react";
import arrow from '../images/down_arrow.png'
import FlyoutMenu from "./FlyoutMenu";

import classes from './DashboardNavigation.css'



const db = getDatabase();

const getUserData = (userId, callback) => {
    const userRef = ref(db, `users/${userId}`);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      callback(userData);
    });
  };


const DashboardNavigation = ({
  onLogout, 
  logoutHandler, 
  shouldHide, 
  handleFlyoutMenuClick }) => {

    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState('');
    

    

  
    useEffect(() => {
        if (currentUser) {
          getUserData(currentUser.uid, setUserData);
        }
      }, [currentUser]);


     

    
    return(

        <div className="navigation" >
          <div className="authentication logged-in">
            <div>
              <div>
                <a className="userMenu">
                  <span onClick={handleFlyoutMenuClick}>{userData.displayName}</span>
                  <img src={arrow}/>
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
          <DashboardLinks/>
          </div>
        </div>
    )
}


export default DashboardNavigation;