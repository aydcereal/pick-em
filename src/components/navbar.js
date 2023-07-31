
import { useContext } from 'react'
import AuthContext from '../context/auth-context'
import logo from '../images/logos/blackLogo.png'
import classes from './Navbar.css'
import MobileNavigation from './mobileNavigation'
import Navigation from './navigation'

const Navbar = () => {
    const {isAuthenticated, handleLogout} = useContext(AuthContext)


    return<div className='navbar '>
    <img className='navLogo' src={logo}/>
   
        <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <MobileNavigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
    
    
    
</div>
}


export default Navbar;