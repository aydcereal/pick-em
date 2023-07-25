
import React, { useContext, useState } from "react"
import { Form, Button, Card } from "react-bootstrap"
import classes from './signUp.css'
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"







const Login = () => {





    let [focusHandler, SetFocusHandler] = useState(false)
    let [enteredEmail, SetEnteredEmail] = useState('')
    let [enteredPassword, SetEnteredPassword] = useState('')
   
    const emailLabelHandler = focusHandler ? 'label-style-pressed' : 'label-style'


    const navigate = useNavigate()


    
      const emailInputHandler = (e) => {
        SetEnteredEmail(e.target.value)
        console.log(e.target.value);;
      }

      const passwordInputHandler = (e) => {
        SetEnteredPassword(e.target.value)
        console.log(e.target.value);;
      }

      const submitHandler = (e) => {
        console.log(enteredEmail + " " + enteredPassword);
        e.preventDefault()
        
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


    const auth = getAuth();
signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });



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