import Navbar from "../components/navbar";
import React, { ReactFragment } from "react";
import GoogleButton from "react-google-button";

const Login = () => {
    return<React.Fragment>
        <Navbar/>
        <form>
        <div className="pageTitle">
            <h1>Login</h1>
        </div>
        <div className="signInButtons" >
            <GoogleButton onClick={() => {console.log('Google button clicked')}} />
        </div>

        </form>
        
    </React.Fragment>
}


export default Login;