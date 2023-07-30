import React, {useContext, useState} from "react"
import classes from './signUp.css'
import GoogleButton from "react-google-button";
import AuthContext from "../context/auth-context";
import { useNavigate } from "react-router-dom";





export default function ChoosePassword() {


    const navigate = useNavigate()

    const {email, updatePassword, signUp} = useContext(AuthContext);
    const [enteredPassword, SetEnteredPassword] = useState('')
    const [enteredConfirmedPassword, SetConfirmedPassword] = useState('')
    const [error, setError] = useState('')

    const enteredPasswordHandler = (e) => {
        SetEnteredPassword(e.target.value)
        ;
    }

    const confirmedPasswordHandler = (e) => {
        SetConfirmedPassword(e.target.value)
        ;
    }

    const isValidEmail = (email) => {
        // Basic email format validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    const continueHandler = async (e) => {
        e.preventDefault()

        if (!isValidEmail(email)) {
            console.log('Invalid email format');
            setError('Invalid email format');
            // Handle the invalid email format error, show feedback to the user if needed
            return;
          }

          try {
            const user = await signUp(email, enteredPassword);
            console.log('Sign Up successful:', user);
            setError('');
            // Now you can navigate to the desired page after successful login
            navigate('/dashboard'); // Change '/dashboard' to your desired next page
          } catch (error) {
            console.log('Sign Up error:', error);
            if (error.code === 'auth/email-already-in-use') {
              setError('A user with the same email address already exists. Already got an account?');
            } else {
              setError(error.message);
            }
            // Handle the login error if needed
          }
       
        
        
       
        

        
    };

    

    const emailInputFocusHandler = event => {
        console.log('focused');
    }

    return<React.Fragment>


        <div className="page-container">

            <div className="layout-body">
                <h1 className="pageTitle">Choose Your Password</h1>
                {error && <p>{error}</p>}
                
                <form className="layout-form">
                    <div className="layout-row" >
                        <label htmlFor='email' className="label-style">Password</label>
                        <input  
                            className='input-style' 
                            onChange={enteredPasswordHandler}
                            onFocus={emailInputFocusHandler} 
                            id="password" 
                            name="password" 
                            type="password" 
                            required />              
                    </div>
                    <div className="layout-row" >
                        <label htmlFor='email' className="label-style">Confirm Password</label>
                        <input  
                        className='input-style' 
                        onChange={confirmedPasswordHandler}
                        onFocus={emailInputFocusHandler} 
                        id="confirm-password" 
                        name="confirm-password" 
                        type="password" 
                        required />              
                    </div>
                    <div className="layout-row-button" >
                        <button onClick={continueHandler} className="layout-button" type="submit" >Continue</button>              
                    </div>
                   
                    
                </form>
                </div>
        

        </div>
        
        
        
    </React.Fragment>
}