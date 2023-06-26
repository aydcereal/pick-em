import React from "react"
import classes from './signUp.css'
import GoogleButton from "react-google-button";





export default function choosePassword() {

    const emailInputFocusHandler = event => {
        console.log('focused');
    }

    return<React.Fragment>


        <div className="page-container">

            <div className="layout-body">
                <h1 className="pageTitle">Choose Your Password</h1>
                
                <form className="layout-form">
                    <div className="layout-row" >
                        <label for='email' className="label-style">Password</label>
                        <input  className='input-style'onFocus={emailInputFocusHandler} id="password" name="password" type="password" required />              
                    </div>
                    <div className="layout-row" >
                        <label for='email' className="label-style">Confirm Password</label>
                        <input  className='input-style'onFocus={emailInputFocusHandler} id="confirm-password" name="confirm-password" type="password" required />              
                    </div>
                    <div className="layout-row-button" >
                        <button className="layout-button" type="submit" >Continue</button>              
                    </div>
                   
                    
                </form>
                </div>
        

        </div>
        
        
        
    </React.Fragment>
}