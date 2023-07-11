import React, { useContext, useState } from "react"
import { Form, Button, Card } from "react-bootstrap"
import classes from './signUp.css'
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/signup-context";






export default function Signup() {

    

    

    let labelClass = "label-style"
    let labelClassPressed = "label-style-pressed"

    let [focusHandler, SetFocusHandler] = useState(false)
   
    const emailLabelHandler = focusHandler ? 'label-style-pressed' : 'label-style'


    const navigate = useNavigate()


    

    
      const { email, updateEmail} = useContext(AuthContext)
      console.log(email);
      
      
    
    
      const emailInputHandler = (e) => {
        updateEmail(e.target.value)
        console.log(email);;
      }

      const submitHandler = (e) => {
        e.preventDefault()
        navigate('password')
      }
    


    const emailInputFocusHandler = (event) => {

            if(event.type === 'focus') {
                SetFocusHandler = true
                console.log('focus');
            }
            else {
                console.log('Blur');
            }
        
    }

    return<React.Fragment>


        <div className="page-container">

            <div className="layout-body">
                <h1 className="pageTitle">Sign Up</h1>
                <div className="signInButtons" >
                    <GoogleButton onClick={() => {console.log('Google button clicked')}} />
                </div>
                <form onSubmit={submitHandler} className="layout-form">
                    <div className="layout-row" >
                        <label htmlFor='email' className={emailLabelHandler }>Email</label>
                        <input  
                            className='input-style' 
                            onChange={emailInputHandler}
                            onBlur={emailInputFocusHandler} 
                            onFocus={emailInputFocusHandler} 
                            id="email" 
                            name="email" 
                            type="email" 
                            required />              
                    </div>
                    <div className="layout-row-button" >
                        <Link className="layout-button" type="submit" >Continue</Link>              
                    </div>
                    
                    
                </form>
                </div>
        

        </div>
        
        
        
    </React.Fragment>
}