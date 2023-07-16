import React, {useContext, useState} from "react"
import classes from './signUp.css'
import GoogleButton from "react-google-button";
import AuthContext from "../context/signup-context";





export default function ChoosePassword() {

    const {email, updatePassword, signUp} = useContext(AuthContext)
    ;

    const [enteredPassword, SetEnteredPassword] = useState('')
    const [enteredConfirmedPassword, SetConfirmedPassword] = useState('')

    const enteredPasswordHandler = (e) => {
        SetEnteredPassword(e.target.value)
        ;
    }

    const confirmedPasswordHandler = (e) => {
        SetConfirmedPassword(e.target.value)
        ;
    }

    const continueHandler = (e) => {
        e.preventDefault()
        
        updatePassword(enteredPassword)
        signUp()

        
    }

    

    const emailInputFocusHandler = event => {
        console.log('focused');
    }

    return<React.Fragment>


        <div className="page-container">

            <div className="layout-body">
                <h1 className="pageTitle">Choose Your Password</h1>
                
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