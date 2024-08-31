import { app } from "../firebase";
import "firebase/compat/database";
const database = app.database();

const getSelectionQuery = (poolId, week) => {
  const selectionRef = database.ref(`selections/${poolId}/Week ${week}`);
  return selectionRef.orderByChild("poolKey").equalTo(poolId);
};

const getIndividualSelectionQuery = (poolId, week, id) => {
  const selectionRef = database.ref(`selections/${poolId}/Week ${week}`);
  return selectionRef.orderByChild("userId").equalTo(id);
};

export const individualSelections = (week, poolId, id) => {
  console.log(week, poolId, id);

  return new Promise((resolve, reject) => {
    try {
      const query = getIndividualSelectionQuery(poolId, week, id);
      query.once("value", (snapshot) => {
        const result = [];
        snapshot.forEach((childSnapshot) => {
          const selectionData = childSnapshot.val();
          console.log(selectionData);

          if (selectionData) {
            result.push({ id: childSnapshot.key, ...selectionData });
          } else {
            result.push(false);
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

export const SelectionData = (week, poolId, displayName) => {
  console.log(week, poolId, displayName);
  return new Promise((resolve, reject) => {
    try {
      const query = getSelectionQuery(poolId, week);

      query.once("value", (snapshot) => {
        console.log(snapshot);

        const result = [];
        snapshot.forEach((childSnapshot) => {
          const selectionData = childSnapshot.val();
          console.log(selectionData);

          if (selectionData.week === parseInt(week, 10)) {
            if (displayName) {
              console.log(selectionData.playerName, displayName);

              if (selectionData.playerName === displayName) {
                console.log("true");

                result.push({ id: childSnapshot.key, ...selectionData });
              }
            } else {
              console.log("false");

              result.push({ id: childSnapshot.key, ...selectionData });
            }
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

export const getEntries = (poolId, week) => {
  return new Promise((resolve, reject) => {
    try {
      const database = app.database();
      const membersRef = database.ref(`pools/${poolId}`);
      const selectionsRef = database.ref(`selections/${poolId}/Week ${week}`);
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
