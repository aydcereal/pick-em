import React from "react"
import { Form, Button, Card } from "react-bootstrap"
import GoogleButton from "react-google-button";





export default function Signup() {

    const emailInputFocusHandler = event => {
        console.log('focused');
    }

    return<React.Fragment>


        <div>
        <h1 className="pageTitle">Sign Up</h1>
        <div className="signInButtons" >
            <GoogleButton onClick={() => {console.log('Google button clicked')}} />
        </div>
        <form>
            <label for='email' className="email-label">Email</label>
            <input  className='email-input'onFocus={emailInputFocusHandler} id="email" name="email" type="email" required />
        </form>

        </div>
        
        
        
    </React.Fragment>
}