import { useState } from 'react'
import closedIcon from '../images/Property 1=Closed.png'
import openIcon from '../images/Property 1=Open.png'
import logo from '../images/logos/blackLogo.png'
import classes from './MobileNavigation.css'
import Navlinks from './navLinks'
import { Link } from 'react-router-dom'

const MobileNavbar = () => {

    const [open, setOpen] = useState(false)

    function closeHamburger() {
        setOpen(false)
    }

    const hamburgerIcon = <img onClick={()=>setOpen(!open) } className='hamburger' src={closedIcon}/>

    const closedHamburger = <img onClick={()=>setOpen(!open) } className='hamburger' src={openIcon}/>



    return (
        <nav className='mobile-navigation '>
            {open && <Navlinks hamburgerHandler={closeHamburger} />}
            {open ? closedHamburger: hamburgerIcon}
            <Link onClick={closeHamburger} to='/login' className='btn btn-lg btn-danger nav-btn'>Login</Link>
        </nav>
    )
}

export default MobileNavbar