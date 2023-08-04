import { NavLink } from "react-router-dom";

const DashboardLinks = (props) => {
    return<ul className='navbar-nav ms-auto'>
    <li  className='nav-item'>
        <NavLink onClick={props.hamburgerHandler}  to="/dashboard" className={({isActive}) =>
            isActive ? 'active nav-link' : 'nav-link'} end>Dashboard</NavLink>
    </li>
    <li className='nav-item'>
        <NavLink onClick={props.hamburgerHandler} to="/Connections" className={({isActive}) =>
            isActive ? 'active nav-link' : 'nav-link'}>Connections</NavLink>
    </li>
    
    
</ul>


}


export default DashboardLinks;