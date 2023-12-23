// fetchPoolData.js
import { app } from "../firebase";
import "firebase/compat/database";

export const fetchPoolData = (poolKey, callback) => {
  const database = app.database();
  const poolsRef = database.ref("/pools");

  poolsRef.child(poolKey).on(
    "value",
    (snapshot) => {
      if (snapshot.exists()) {
        const poolData = snapshot.val();
        callback(poolData);
      } else {
        console.log("Pool not found");
      }
    },
    (error) => {
      console.log("Error fetching pool from Firebase", error);
      throw error;
    }
  );
};
