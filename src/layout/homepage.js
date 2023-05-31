import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './homepage.css'
import Navbar from './navbar'
import heroImg from '../images/Pick ems hero.png'
import React from 'react'


const homepage = () => {
    return <React.Fragment>
            <Navbar/>
            <div className='container' >
            <div className='hero'>
                <img className='hero-img' src={heroImg}/>
                <div className='countdown-timer' >
                    <h1>Submission deadline</h1>
                    <h1>01: 08: 37: 45</h1>
                </div>
            </div>
            <div className='homepage-body'>
                <div className='row'>
                    <div className='col-12 col-sm-6'>
                            <div className='title'>
                                <div className='rectangle'></div>
                                <h1>Welcome to pick em bets</h1>
                                
                            </div>
                            
                        
                    </div>
                </div>
            </div>

            </div>
    </React.Fragment>
    
}

export default homepage