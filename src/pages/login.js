
import React, { useContext, useState } from "react"
import classes from './signUp.css'
import GoogleButton from "react-google-button";
import {useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";








const Login = () => {





    let [focusHandler, SetFocusHandler] = useState(false)
    let [enteredEmail, SetEnteredEmail] = useState('')
    let [enteredPassword, SetEnteredPassword] = useState('')
    
    const {updateEmail, updatePassword, login} = useContext(AuthContext);
   
    const emailLabelHandler = focusHandler ? 'label-style-pressed' : 'label-style'


    const navigate = useNavigate()


    
      const emailInputHandler = (e) => {
        SetEnteredEmail(e.target.value)
        ;;
      }

      const passwordInputHandler = (e) => {
        SetEnteredPassword(e.target.value)
       ;;
      }

      const submitHandler = (e) => {
        
        e.preventDefault()
        updateEmail(enteredEmail)
        updatePassword(enteredPassword)
        login()
        
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
                <h1 className="pageTitle">Login</h1>
                <div className="signInButtons" >
                    <GoogleButton onClick={() => {console.log('Google button clicked')}} />
                </div>
                <form onSubmit={submitHandler} className="layout-form">
                    <div className="layout-row" >
                        <label htmlFor='email' className={emailLabelHandler }>Email</label>
                        <input  
                            className='input-style' 
                            onChange={emailInputHandler}
                           
                            id="email" 
                            name="email" 
                            type="email" 
                            required />              
                    </div>
                    <div className="layout-row" >
                        <label htmlFor='password' className={emailLabelHandler }>Password</label>
                        <input  
                            className='input-style' 
                            onChange={passwordInputHandler}
                            
                            id="password" 
                            name="password" 
                            type="password" 
                            required />              
                    </div>

                    <div className="layout-row-button" >
                        <button className="layout-button" type="submit" >Login</button>              
                    </div>
                    
                    
                </form>
                </div>
        

        </div>
        
    </React.Fragment>
}


export default Login;