import { createContext, useState } from 'react';
import {auth} from '../firebase'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');

  function login (email, password)  {
    return auth.creaeUserWithEmailAndPassword(email, password)
  }

  auth.onAuthStateChanged(user => {
    setCurre
  })

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
