import { NavLink } from "react-router-dom";

const DashboardLinks = (props) => {
    return<ul className='SecondaryNav HeaderNav'>
    <li  className='SecondaryNavItem'>
        <NavLink 
            to="/dashboard" 
            className='SecondaryNavLink'>
            Dashboard
            </NavLink>
    </li>
    <li className='SecondaryNavItem'>
        <NavLink to="/Connections" className='SecondaryNavLink' >Connections</NavLink>
    </li>
    
    
</ul>


}


export default DashboardLinks;