import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

export default function Signup() {
  let [focusHandler, SetFocusHandler] = useState(false);
  const [isEmailTaken, setIsEmailTaken] = useState(false);

  const emailLabelHandler = focusHandler
    ? "label-style-pressed"
    : "label-style";

  const navigate = useNavigate();

  const { email, updateEmail, checkIfEmailExists } = useContext(AuthContext);

  const emailInputHandler = (e) => {
    updateEmail(e.target.value);
    console.log(email);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const emailExists = await checkIfEmailExists(email);
    if (emailExists) {
      setIsEmailTaken(true);
    } else {
      navigate("password");
    }
    console.log(emailExists);
  };

  const emailInputFocusHandler = (event) => {
    if (event.type === "focus") {
      SetFocusHandler = true;
      console.log("focus");
    } else {
      console.log("Blur");
    }
  };

  return (
    <React.Fragment>
      <div className="page-container">
        <div className="layout-body">
          <h1 className="pageTitle">Sign Up</h1>
          {isEmailTaken && (
            <p className="nameTaken">Email is already registered</p>
          )}

          <form onSubmit={submitHandler} className="layout-form">
            <div className="layout-row">
              <label htmlFor="email" className={emailLabelHandler}>
                Email
              </label>
              <input
                className="input-style"
                onChange={emailInputHandler}
                onBlur={emailInputFocusHandler}
                onFocus={emailInputFocusHandler}
                id="email"
                name="email"
                type="email"
                required
              />
            </div>

            <div className="layout-row-button">
              <button className="layout-button">Continue</button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
