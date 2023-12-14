import { app } from "../firebase";
import "firebase/compat/database";

const getSelectionQuery = (poolId) => {
  const database = app.database();
  const selectionRef = database.ref("selections");
  return selectionRef.orderByChild("poolKey").equalTo(poolId);
};

export const SelectionData = (week, poolId) => {
  return new Promise((resolve, reject) => {
    try {
      const query = getSelectionQuery(poolId);

      query.on("value", (snapshot) => {
        let totalEntries = 0;
        const result = [];
        snapshot.forEach((childSnapshot) => {
          const selectionData = childSnapshot.val();
          if (selectionData.week === parseInt(week, 10)) {
            totalEntries = totalEntries + 1;
            console.log(totalEntries);
            result.push({ id: childSnapshot.key, ...selectionData });
          }
        });

        resolve(result);
      });
    } catch (error) {
      reject(error);
      console.error("Error Fetching Data", error);
    }
  });
};

export const getEntries = (poolId) => {
  console.log(poolId);
  return new Promise((resolve, reject) => {
    try {
      const database = app.database();
      const membersRef = database.ref(`pools/${poolId}`);

      membersRef
        .once("value")
        .then((snapshot) => {
          const poolData = snapshot.val();

          if (poolData && poolData.members) {
            const members = poolData.members;

            resolve(Object.keys(members).length);
          } else {
            console.log("Members not found for the pool");
            resolve([]); // Resolve with an empty array if members not found
          }
        })
        .catch((error) => {
          console.error("Error fetching pool data:", error);
          reject(error);
        });
    } catch (error) {
      console.error("Error fetching pool data:", error);
      reject(error);
    }
  });
};
