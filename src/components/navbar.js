
import { useContext } from 'react'
import AuthContext from '../context/auth-context'
import logo from '../images/logos/blackLogo.png'
import checkMark from '../images/checkmark_confirm.png'
import classes from './Navbar.css'
import MobileNavigation from './mobileNavigation'
import Navigation from './navigation'
import { NavLink, useLocation } from 'react-router-dom'
import DashboardNavigation from './DashboardNavigation'




const Navbar = ({ showAlert, shouldHide, logoutHandler }) => {
    const { isAuthenticated, handleLogout } = useContext(AuthContext);
    const location = useLocation()
    const isDashboard = location.pathname === '/dashboard'
   

  
    return (
      <header className="navbar navbar-expand-lg navbar-light header__root">
        <div className='container-wrapper'>
          <div className='container branding-standard'>

            <NavLink to='/'>
            <img className="navLogo" src={logo} />
            </NavLink>

            {isDashboard ? (
              <DashboardNavigation 
                onLogout={handleLogout}
                logoutHandler={logoutHandler} />
            ) : (
              <Navigation
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
                logoutHandler={logoutHandler}
                 /> ) }
           
            

            <MobileNavigation 
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
              logoutHandler={logoutHandler}
              
                />

          </div>

        </div>

        <div className={`alert-container ${shouldHide ? 'hidden' : ''}`}>
          <div className={`alert ${!showAlert ? 'fade-out' : ''}`}>
            <img src={checkMark} />
            <p>You have been signed out</p>
          </div>
        </div>    
     
      </header>
    );
  };
  


export default Navbar;