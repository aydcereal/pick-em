import { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import {app} from '../firebase'


const AuthContext = createContext();
const auth = getAuth(app);





export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  


  const updateEmail = (newEmail) => {
    setEmail(newEmail);
  };

  const updatePassword = (newPassword) => {
    setPassword(newPassword)
    ;
  }

  const signUp = () => {
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Sign-up Error:", errorCode, errorMessage)
      // ..
    });
  }

  useEffect(() => {
    console.log('Inside useEffect')
    const unsubscribe =  auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })

      return unsubscribe
  } ,[email, password])

  const value = {
    currentUser,
    signUp
  }

  

    return  (
    <AuthContext.Provider value={{ email, updateEmail, updatePassword, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
