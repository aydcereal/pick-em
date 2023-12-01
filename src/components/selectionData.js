import { app } from "../firebase";
import "firebase/compat/database";

const SelectionData = (week, poolId) => {
  console.log(poolId);
  return new Promise((resolve, reject) => {
    try {
      const database = app.database();
      const selectionRef = database.ref("selections");

      const query = selectionRef.orderByChild("poolKey").equalTo(poolId);

      query.on("value", (snapshot) => {
        const result = [];
        snapshot.forEach((childSnapshot) => {
          const selectionData = childSnapshot.val();
          if (selectionData.week === parseInt(week, 10)) {
            result.push({ id: childSnapshot.key, ...selectionData });
          }
        });
        console.log("result ", result);
        resolve(result);
      });
    } catch (error) {
      reject(error);
      console.error("Error Fetching Data", error);
    }
  });
};

export default SelectionData;
