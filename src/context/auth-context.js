import { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import {getDatabase, ref, set} from "firebase/database"
import {app} from '../firebase'



const AuthContext = createContext();
const auth = getAuth(app);
const db = getDatabase()





export const AuthProvider = ({ children }) => {

  

  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const saveUserData = (userId, userData) => {
    set(ref(db, `users/${userId}`), userData);
  };

  


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
          localStorage.setItem('authToken', user.accessToken);
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
          localStorage.setItem('authToken', user.accessToken);
          
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
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setIsAuthenticated(!!user);
    });
  
    return () => unsubscribe();
  }, [setCurrentUser, setIsAuthenticated]);
  

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
       
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };


  const value = {
    currentUser,
    isAuthenticated,
    signUp,
    login,
    handleLogout,
    updateEmail, 
    updatePassword, 
    email,
    saveUserData
  }

  

     return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
