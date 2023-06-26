import Navlinks from "./navLinks";
import { NavLink } from "react-router-dom";


const Navigation = () => {
    return(

        <nav className="navigation" >
            
            
        <Navlinks/>
        <NavLink  className='btn btn-lg btn-danger nav-btn' to='/login' >Login</NavLink>
        
        
        </nav>
    )
}


export default Navigation;