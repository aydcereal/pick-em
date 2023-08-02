import Navlinks from "./navLinks";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";
import { useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect } from "react";
import { useContext } from "react";
import arrow from '../images/down_arrow.png'



const db = getDatabase();

const getUserData = (userId, callback) => {
    const userRef = ref(db, `users/${userId}`);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      callback(userData);
    });
  };


const Navigation = ({isAuthenticated, onLogout, logoutHandler }) => {

    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    

    useEffect(() => {
        if (currentUser) {
            console.log(currentUser);
          getUserData(currentUser.uid, setUserData);
        }
      }, [currentUser]);

    
    return(

        <nav className="navigation" >
            
            
        <Navlinks/>
        {isAuthenticated ? (
            <div onClick={event => {
                onLogout(); 
                logoutHandler();
            }} >
                <a className="userMenu">
                {userData && userData.displayName}
                <img src={arrow}/>
                </a>
               
            </div>
        ) :<NavLink  className='btn btn-lg btn-danger nav-btn' to='/login' >
            Login
            </NavLink> }
        
        
        
        </nav>
    )
}


export default Navigation;