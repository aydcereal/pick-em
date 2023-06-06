
import logo from '../images/logos/blackLogo.png'
import classes from './Navbar.css'

import MobileNavigation from './mobileNavigation'
import Navigation from './navigation'

const Navbar = () => {
    return<div className='navbar '>
    <img className='navLogo' src={logo}/>
   
        <Navigation/>
        <MobileNavigation/>
    
    
    
</div>
}


export default Navbar;