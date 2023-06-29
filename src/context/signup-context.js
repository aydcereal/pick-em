// import React from "react";

// const SignUpContext = React.createContext({
//     enteredEmail: 'Test'
// })


// export default SignUpContext;


import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');

  const updateEmail = (newEmail) => {
    setEmail(newEmail);
  };

  return (
    <AuthContext.Provider value={{ email, updateEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
