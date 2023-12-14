import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  query,
  orderByChild,
  get,
  onValue,
} from "firebase/database";
import { equalTo } from "firebase/database";

import { app } from "../firebase";

const AuthContext = createContext();
const auth = getAuth(app);
const db = getDatabase();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [displayName, setDisplayName] = useState();
  const [userData, setUserData] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      getUserData(currentUser.uid, setUserData);
    }
  }, [currentUser]);

  const getUserData = (userId, callback) => {
    const userRef = ref(db, `users/${userId}`);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      callback(userData);
    });
  };

  const isDisplayNameUnique = async (displayName) => {
    const usersRef = ref(db, "users");

    // Query to check if displayName exists
    const displayNameQuery = query(
      usersRef,
      orderByChild("displayName"),
      equalTo(displayName)
    );

    try {
      const snapshot = await get(displayNameQuery);
      console.log("Snapshot value:", snapshot.val());
      return !snapshot.exists();
    } catch (error) {
      console.error("Error checking display name uniqueness:", error);
      return false;
    }
  };

  const saveUserData = async (userId, userData) => {
    const { displayName } = userData;
    console.log("displayName: ", displayName);
    console.log("userData: ", userData);

    const isUnique = await isDisplayNameUnique(displayName);

    if (!isUnique) {
      console.log("Display name is not unique. Choose another display name.");
      // You might want to throw an error or handle the error in another way
      return false;
    }

    // Continue with saving the user data since the display name is unique
    set(ref(db, `users/${userId}`), userData);
    console.log("User data saved successfully");
    return true;
  };

  const updateEmail = (newEmail) => {
    setEmail(newEmail);
  };

  const updatePassword = (newPassword) => {
    setPassword(newPassword);
  };

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("authToken", user.accessToken);
          resolve(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error + errorMessage);
          reject(error);
        });
    });
  };

  const signUp = (email, password) => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("authToken", user.accessToken);

          resolve(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error + errorMessage);
          reject(error);
        });
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, [setCurrentUser, setIsAuthenticated]);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const checkIfEmailExists = async (email) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length === 0) {
        console.log("Email not found");
        return false;
      } else {
        console.log("Email is already registered");
        return true;
      }
    } catch (error) {
      console.error(error);
    }
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
    saveUserData,
    checkIfEmailExists,
    userData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
