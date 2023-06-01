import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './homepage.css'
import Navbar from './navbar'
import heroImg from '../images/cartoon hero.png'
import React from 'react'


const homepage = () => {
    return <React.Fragment>
            <Navbar/>
            <div className='container'  >
            <div className='hero'>
                <img className='hero-img' src={heroImg}/>
                
            </div>
            <div className='homepage-body'>
                <div className='row'>
                    <div className='col-12 col-sm-6'>
                            <div className='title'>
                                <div className='rectangle'></div>
                                <h1>Welcome to pick em bets</h1>
                                
                            </div>
                            <p>your premier destination for weekly football picks and exciting wagers! Join us now to play alongside your friends and family, as you make informed bets on your favorite teams. Sign up today and embark on a thrilling journey of football and friendly competition!</p>
                            
                        
                    </div>
                </div>
            </div>

            </div>
    </React.Fragment>
    
}

export default homepage