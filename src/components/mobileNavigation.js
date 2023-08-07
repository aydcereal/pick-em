import { useState } from 'react';
import closedIcon from '../images/Property 1=Closed.png';
import openIcon from '../images/Property 1=Open.png';
import logo from '../images/logos/blackLogo.png';
import classes from './MobileNavigation.css';
import Navlinks from './navLinks';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import FlyoutMenu from './FlyoutMenu';
import { useSelector, useDispatch } from 'react-redux';
import { setFlyoutHide } from '../redux/store';

const MobileNavbar = ({ isAuthenticated, onLogout, logoutHandler }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard'
  const flyoutHide = useSelector((state) => state.flyoutHide)

  const dispatch = useDispatch();



  function closeHamburger() {
    setOpen(false);
  }

  const hamburgerIcon = (
    <img
      onClick={() => setOpen(!open)}
      className="hamburger"
      src={closedIcon}
    />
  );

  const closedHamburger = (
    <img
      onClick={() => setOpen(!open)}
      className="hamburger"
      src={openIcon}
    />
  );

  return (
    <nav className="mobile-navigation ">
      {open && <Navlinks hamburgerHandler={closeHamburger} />}
      {open ? closedHamburger : hamburgerIcon}
     
      
      {isDashboard ? (
        <div >
        <a onClick={dispatch(setFlyoutHide(!flyoutHide))} className='btn btn-danger btn-md btn-dash'>
        <FontAwesomeIcon icon={faUser} style={{color: "#fafafa",}} />
        </a>
        <FlyoutMenu 
          onLogout={onLogout}
          logoutHandler={logoutHandler}  />

      </div>

      ) : (
        isAuthenticated ? (
          <div >
            <Link to='/dashboard' className='btn btn-danger btn-md btn-dash'>
            <FontAwesomeIcon icon={faUser} style={{color: "#fafafa",}} />
            </Link>
  
          </div>
        ) : (
          <Link
            onClick={closeHamburger}
            to="/login"
            className="btn btn-lg btn-danger nav-btn"
          >
            Login
          </Link>
      )
      
      
      )}
    </nav>
  );
};

export default MobileNavbar;
