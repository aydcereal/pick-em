import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/auth-context";
import { ref, onValue } from "firebase/database";
import { app } from "../firebase";

const database = app.database();

const useFullName = () => {
  const [fullName, setFullName] = useState("");
  const { currentUser } = useContext(AuthContext);

  const getUserData = (userId, callback) => {
    const userRef = ref(database, `users/${userId}`);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      callback(userData);
    });
  };

  useEffect(() => {
    if (currentUser) {
      getUserData(currentUser.uid, (userData) => {
        setFullName(userData.firstName + " " + userData.lastName);
      });
    }
  }, [currentUser]);

  return fullName;
};

export default useFullName;
