import { app } from "../firebase";
import "firebase/compat/database";

export const fetchPoolData = async (poolKey) => {
  const database = app.database();

  try {
    const poolsRef = database.ref("/pools");

    const snapshot = await poolsRef.child(poolKey).once("value");

    if (snapshot.exists()) {
      const poolData = snapshot.val();
      return poolData;
    } else {
      console.log("Pool not found");
      return null;
    }
  } catch (error) {
    console.log("Error fetching pool from Firebase", error);
    throw error;
  }
};
