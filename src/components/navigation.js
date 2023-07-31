import Navlinks from "./navLinks";
import { NavLink } from "react-router-dom";


const Navigation = ({isAuthenticated, onLogout }) => {
    return(

        <nav className="navigation" >
            
            
        <Navlinks/>
        {isAuthenticated ? (
            <button onClick={onLogout} className="btn btn-lg btn-danger nav-btn">
                Logout
            </button>
        ) :<NavLink  className='btn btn-lg btn-danger nav-btn' to='/login' >
            Login
            </NavLink> }
        
        
        
        </nav>
    )
}


export default Navigation;