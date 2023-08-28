import DashboardLinks from "./DashboardLinks";
import AuthContext from "../context/auth-context";
import { useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import classes from './DashboardNavigation.css'



const db = getDatabase();

const getUserData = (userId, callback) => {
    const userRef = ref(db, `users/${userId}`);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      callback(userData);
    });
  };


const FlyoutMenu = ({handleLogout, logoutHandler, shouldHide }) => {

    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState('');
    

  

    const handleClick = () => {
        logoutHandler();
        handleLogout();
  
      }

      
  
     

    useEffect(() => {
        if (currentUser) {
          getUserData(currentUser.uid, setUserData);
        }
      }, [currentUser]);


    return (
        <div className={`FlyoutContainer container ${shouldHide ? 'hidden' : ''}`} >
                <div className="gCnJAE"> 
                  <div className="jZdOJn">
                    {userData && (
                      <div className="iyZekZ">
                        <h3 className="eiPLGK">{'test'}</h3>
                        <div className="kuExIK">
                          <Link to='/edit-account'>Edit account</Link>
                          <Link onClick={handleClick}>Sign Out</Link>
                        </div>
                      </div>
)}
                  </div>

                </div>

              </div>
    )
}


export default FlyoutMenu