import DashboardLinks from "./DashboardLinks";
import AuthContext from "../context/auth-context";
import { useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import arrow from '../images/down_arrow.png'

import classes from './DashboardNavigation.css'



const db = getDatabase();

const getUserData = (userId, callback) => {
    const userRef = ref(db, `users/${userId}`);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      callback(userData);
    });
  };


const DashboardNavigation = ({onLogout, logoutHandler }) => {

    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState('');
    const [shouldHide, setShouldHide] = useState(true)

    


    const handleClick = () => {
      logoutHandler();
      onLogout();

    }

    const flyoutHandler = () => {
      setShouldHide(!shouldHide)
    }
    
    
    

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
                  <span onClick={flyoutHandler}>{userData.displayName}</span>
                  <img src={arrow}/>
                </a> 
              </div>
              <div className={`FlyoutContainer container ${shouldHide ? 'hidden' : ''}`} >
                <div className="gCnJAE"> 
                  <div className="jZdOJn">
                    <div className="iyZekZ">
                      <h3 className="eiPLGK">{userData.displayName}</h3>
                      <div className="kuExIK"> 
                      <Link to='/edit-account'>Edit account</Link>
                      <Link onClick={handleClick}>Sign Out</Link>

                      </div>
                    </div>
                  </div>

                </div>

              </div>


            </div>

            


       
          </div>

          <div className="collapse navbar-collapse">
          <DashboardLinks/>
          </div>
            
            
        
        
        
        
        
        </div>
    )
}


export default DashboardNavigation;