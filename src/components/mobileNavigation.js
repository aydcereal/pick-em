import { useState } from 'react'
import closedIcon from '../images/Property 1=Closed.png'
import openIcon from '../images/Property 1=Open.png'
import logo from '../images/logos/blackLogo.png'
import classes from './MobileNavigation.css'
import Navlinks from './navLinks'

const MobileNavbar = () => {

    const [open, setOpen] = useState(false)

    const hamburgerIcon = <img onClick={()=>setOpen(!open) } className='hamburger' src={closedIcon}/>

    const closedHambueger = <img onClick={()=>setOpen(!open) } className='hamburger' src={openIcon}/>



    return (
        <nav className='mobile-navigation '>
            {open && <Navlinks/>}
            {open ? closedHambueger: hamburgerIcon}
            <a href='/login' className='btn btn-lg btn-danger nav-btn'>Login</a>
        </nav>
    )
}

export default MobileNavbar