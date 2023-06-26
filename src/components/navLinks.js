import { NavLink } from "react-router-dom";

const Navlinks = (props) => {
    return<ul className='navbar-nav ms-auto'>
    <li  className='nav-item'>
        <NavLink onClick={props.hamburgerHandler}  to="/" className={({isActive}) =>
            isActive ? 'active nav-link' : 'nav-link'} end>Home</NavLink>
    </li>
    <li className='nav-item'>
        <NavLink onClick={props.hamburgerHandler} to="/dashboard" className={({isActive}) =>
            isActive ? 'active nav-link' : 'nav-link'}>Dashboard</NavLink>
    </li>
    <li className='nav-item'>
    <NavLink onClick={props.hamburgerHandler} to="/create" className={({isActive}) =>
            isActive ? 'active nav-link' : 'nav-link'}>create a pool</NavLink>
    </li>
    
</ul>


}


export default Navlinks;