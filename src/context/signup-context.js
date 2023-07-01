import { createContext, useState } from 'react';
import {auth} from '../firebase'

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
