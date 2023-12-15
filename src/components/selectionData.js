import { type } from "@testing-library/user-event/dist/type";
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

      query.once("value", (snapshot) => {
        let totalEntries = 0;
        const result = [];
        snapshot.forEach((childSnapshot) => {
          const selectionData = childSnapshot.val();
          if (selectionData.week === parseInt(week, 10)) {
            totalEntries = totalEntries + 1;

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

// export const getEntries = (poolId) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const database = app.database();
//       const membersRef = database.ref(`pools/${poolId}`);

//       membersRef
//         .once("value")
//         .then((snapshot) => {
//           const poolData = snapshot.val();

//           if (poolData && poolData.members) {
//             const members = poolData.members;

//             resolve(Object.keys(members).length);
//           } else {
//             console.log("Members not found for the pool");
//             resolve([]); // Resolve with an empty array if members not found
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching pool data:", error);
//           reject(error);
//         });
//     } catch (error) {
//       console.error("Error fetching pool data:", error);
//       reject(error);
//     }
//   });
// };

// export const getActiveEntries = (poolId, week) => {
//   console.log(poolId);
//   console.log(typeof week);
//   return new Promise((resolve, reject) => {
//     try {
//       const database = app.database();
//       const selectionsRef = database.ref(`selections`);
//       const activeSelections = [];

//       selectionsRef.once("value").then((snapshot) => {
//         snapshot.forEach((childSnapshot) => {
//           const entry = childSnapshot.val();

//           if (entry.poolKey == poolId && entry.week == week) {
//             activeSelections.push(entry.playerName);
//           }
//         });
//         console.log(activeSelections);
//         resolve(activeSelections);
//       });
//     } catch (error) {
//       console.error("Error fetching pool data:", error);
//       reject(error);
//     }
//   });
// };

export const getEntries = (poolId, week) => {
  return new Promise((resolve, reject) => {
    try {
      const database = app.database();
      const membersRef = database.ref(`pools/${poolId}`);
      const selectionsRef = database.ref(`selections`);
      const activeSelections = [];

      membersRef
        .once("value")
        .then((snapshot) => {
          const poolData = snapshot.val();
          const membersCount =
            poolData && poolData.members
              ? Object.keys(poolData.members).length
              : 0;

          selectionsRef.once("value").then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const entry = childSnapshot.val();

              if (entry.poolKey == poolId && entry.week == week) {
                activeSelections.push(entry.playerName);
              }
            });

            resolve({
              membersCount: membersCount,
              activeSelections: activeSelections,
              totalSelections: activeSelections.length,
            });
          });
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
