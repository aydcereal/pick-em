import { NavLink } from "react-router-dom";

const DashboardLinks = (props) => {
    return<ul className='SecondaryNav HeaderNav'>
    <li  className='SecondaryNavItem'>
        <NavLink onClick={props.hamburgerHandler}  
            to="/dashboard" 
            className='SecondaryNavLink'>
            Dashboard
            </NavLink>
    </li>
    <li className='SecondaryNavLink'>
        <NavLink onClick={props.hamburgerHandler} to="/Connections" className={({isActive}) =>
            isActive ? 'active nav-link' : 'nav-link'}>Connections</NavLink>
    </li>
    
    
</ul>


}


export default DashboardLinks;