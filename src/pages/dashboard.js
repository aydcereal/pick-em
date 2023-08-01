import { logDOM } from "@testing-library/react";
import AuthContext from "../context/auth-context"
import { useContext, useState, useEffect } from "react"
import { getDatabase, ref, onValue } from "firebase/database";

const db = getDatabase();

const getUserData = (userId, callback) => {
    const userRef = ref(db, `users/${userId}`);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      callback(userData);
    });
  };


export default function  Dashboard () {
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        if (currentUser) {
          getUserData(currentUser.uid, setUserData);
        }
      }, [currentUser]);


    return (
    <div>
      <h1 className="pageTitle">Dashboard</h1>
      {userData && (
        <div>
          <p>Display Name: {userData.displayName}</p>
          {/* other user data */}
        </div>
      )}
    </div>
  );
}