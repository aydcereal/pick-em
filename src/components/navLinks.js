import { NavLink } from "react-router-dom";

const Navlinks = (props) => {
    return<ul className='navbar-nav ms-auto'>
    <li  className='nav-item'>
        <NavLink onClick={props.hamburgerHandler}  to="/pools/start" className={({isActive}) =>
            isActive ? 'active nav-link' : 'nav-link'} end>Start A New Pool</NavLink>
    </li>
    <li className='nav-item'>
        <NavLink onClick={props.hamburgerHandler} to="/join" className={({isActive}) =>
            isActive ? 'active nav-link' : 'nav-link'}>Join A Pool</NavLink>
    </li>
    <li className='nav-item'>
    <NavLink onClick={props.hamburgerHandler} to="/pricing" className={({isActive}) =>
            isActive ? 'active nav-link' : 'nav-link'}>Pricing</NavLink>
    </li>
    <li className='nav-item'>
    <NavLink onClick={props.hamburgerHandler} to="/support" className={({isActive}) =>
            isActive ? 'active nav-link' : 'nav-link'}>Support</NavLink>
    </li>
    
</ul>


}


export default Navlinks;