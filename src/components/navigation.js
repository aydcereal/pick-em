import Navlinks from "./navLinks";
import { NavLink, useNavigate } from "react-router-dom";



const Navigation = ({isAuthenticated, onLogout, logoutHandler }) => {

    
    return(

        <nav className="navigation" >
            
            
        <Navlinks/>
        {isAuthenticated ? (
            <button onClick={event => {
                onLogout(); 
                logoutHandler();
            }} className="btn btn-lg btn-danger nav-btn">
                Logout
            </button>
        ) :<NavLink  className='btn btn-lg btn-danger nav-btn' to='/login' >
            Login
            </NavLink> }
        
        
        
        </nav>
    )
}


export default Navigation;