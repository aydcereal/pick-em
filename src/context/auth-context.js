import { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import {app} from '../firebase'


const AuthContext = createContext();
const auth = getAuth(app);





export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  


  const updateEmail = (newEmail) => {
    setEmail(newEmail);
  };

  const updatePassword = (newPassword) => {
    setPassword(newPassword)
    ;
  }


  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          resolve(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error + errorMessage);
          reject(error);
        });
    });
  }


  const signUp = (email, password) => {

    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          resolve(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error + errorMessage);
          reject(error);
        });
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
    signUp,
    login,
    updateEmail, 
    updatePassword, 
    email
  }

  

     return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
