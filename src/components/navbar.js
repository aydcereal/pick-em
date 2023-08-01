
import { useContext } from 'react'
import AuthContext from '../context/auth-context'
import logo from '../images/logos/blackLogo.png'
import checkMark from '../images/checkmark_confirm.png'
import classes from './Navbar.css'
import MobileNavigation from './mobileNavigation'
import Navigation from './navigation'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const Navbar = () => {
    const { isAuthenticated, handleLogout } = useContext(AuthContext);
    const [showAlert, setShowAlert] = useState(false);
    const [shouldHide, setShouldHide] = useState(true);

   
  
    const navigate = useNavigate();
  
    const logoutHandler = () => {
      console.log('Log out handler called');
      navigate("/");
      setShowAlert(true);
      setShouldHide(false)
      setTimeout(() => {
        setShowAlert(false);
        setTimeout(() => setShouldHide(true), 5000);
      }, 5000);
    };
  
    return (
      <div className="navbar">
        <div className={`alert-container ${shouldHide ? 'hidden' : ''}`}>
          <div className={`alert ${!showAlert ? 'fade-out' : ''}`}>
            <img src={checkMark} />
            <p>You have been signed out</p>
          </div>
        </div>
  
        <img className="navLogo" src={logo} />
        <Navigation
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          logoutHandler={logoutHandler}
        />
        <MobileNavigation 
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          logoutHandler={logoutHandler}
            />
      </div>
    );
  };
  


export default Navbar;