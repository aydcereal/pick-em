


import logo from '../images/logos/blackLogo.png'
import classes from './Navbar.css'
import MobileNavigation from './mobileNavigation'
import Navigation from './navigation'
import { NavLink } from 'react-router-dom'






const Navbar = ({ logoutHandler, isAuthenticated, handleLogout, shouldHide, handleFlyoutMenuClick }) => {
    
    return (
      <header className="navbar navbar-expand-lg navbar-light header__root">
        <div className='container-wrapper'>
          <div className='container branding-standard'>

            <NavLink to='/'>
            <img className="navLogo" src={logo} />
            </NavLink>
            
            <Navigation
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
                logoutHandler={logoutHandler}
                 /> 

            <MobileNavigation 
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
              logoutHandler={logoutHandler}
              shouldHide={shouldHide}
              handleFlyoutMenuClick={handleFlyoutMenuClick}
              
                />

          </div>

        </div>

        

       
      </header>
    );
  };
  


export default Navbar;