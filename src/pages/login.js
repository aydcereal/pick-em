import React, { useContext, useState, useEffect } from "react";
import classes from './signUp.css'
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

const Login = () => {
  let [focusHandler, SetFocusHandler] = useState(false);
  let [enteredEmail, SetEnteredEmail] = useState('');
  let [enteredPassword, SetEnteredPassword] = useState('');
  const [error, setError] = useState('')

  const { updateEmail, updatePassword, login, currentUser } = useContext(AuthContext);
  const emailLabelHandler = focusHandler ? 'label-style-pressed' : 'label-style';

  const navigate = useNavigate();

  const emailInputHandler = (e) => {
    SetEnteredEmail(e.target.value);
  };

  const passwordInputHandler = (e) => {
    SetEnteredPassword(e.target.value);
  };

  const isValidEmail = (email) => {
    // Basic email format validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    if (!isValidEmail(enteredEmail)) {
      console.log('Invalid email format');
      setError('Invalid email format');
      // Handle the invalid email format error, show feedback to the user if needed
      return;
    }
  
    try {
      const user = await login(enteredEmail, enteredPassword);
      console.log('Login successful:', user);
      setError('');
      // Now you can navigate to the desired page after successful login
      navigate('/dashboard'); // Change '/dashboard' to your desired next page
    } catch (error) {
      console.log('Login error:', error);
      if (error.code === 'auth/user-not-found') {
        setError('Invalid email or password');
      } else {
        setError(error.message);
      }
      // Handle the login error if needed
    }
  };

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);  
      navigate('/dashboard'); // Change '/dashboard' to your desired next page after successful login
    }
  }, [currentUser, navigate]);
    


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
                {error && <p>{error}</p>}
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