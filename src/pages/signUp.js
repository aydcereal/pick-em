import React from "react"
import { Form, Button, Card } from "react-bootstrap"
import classes from './signUp.css'
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";





export default function Signup() {
    let labelClass = "label-style"


    const emailInputFocusHandler = event => {
        
    }

    return<React.Fragment>


        <div className="page-container">

            <div className="layout-body">
                <h1 className="pageTitle">Sign Up</h1>
                <div className="signInButtons" >
                    <GoogleButton onClick={() => {console.log('Google button clicked')}} />
                </div>
                <form className="layout-form">
                    <div className="layout-row" >
                        <label htmlFor='email' className={labelClass}>Email</label>
                        <input  className='input-style'onFocus={emailInputFocusHandler} id="email" name="email" type="email" required />              
                    </div>
                    <div className="layout-row-button" >
                        <Link to='password' className="layout-button" type="submit" >Continue</Link>              
                    </div>
                    
                    
                </form>
                </div>
        

        </div>
        
        
        
    </React.Fragment>
}