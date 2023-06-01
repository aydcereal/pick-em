import closedIcon from '../images/Property 1=Closed.png'
import openIcon from '../images/Property 1=Open.png'
import logo from '../images/logos/blackLogo.png'
import classes from './Navbar.css'

const navbar = () => {
    return (
        <div className='navbar'>
            <img className='navLogo' src={logo}/>
            <img src={closedIcon}/>
        </div>
    )
}

export default navbar