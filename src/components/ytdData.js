import { app } from "../firebase";
import "firebase/compat/database";

const ytdData = () => {
  return new Promise((resolve, reject) => {
    const poolId = "-NkN4le9I5JNY92sXeUH";
    const playerName = "Half Chubb";
    let allNames = [];
    let scores = [];

    const database = app.database();
    const selectionRef = database.ref(`selections/${poolId}`);
    selectionRef.orderByChild("poolKey").equalTo(poolId);

    selectionRef.once("value", (snapshot) => {
      const dataObject = snapshot.val();

      snapshot.forEach((childSnapshot) => {
        const selectionData = childSnapshot.val();

        const firstObject = Object.values(selectionData);
        firstObject.forEach((item) => {
          if (allNames.includes(item.playerName)) {
            return;
          } else {
            allNames.push(item.playerName);
          }
        });
      });

      allNames.forEach((name) => {
        let totalPoints = 0;

        for (let week in dataObject) {
          for (let player in dataObject[week]) {
            if (dataObject[week][player].playerName === name) {
              totalPoints += dataObject[week][player].wins;
            }
          }
        }

        scores.push({ name, totalPoints });
        scores.sort((a, b) => b.totalPoints - a.totalPoints);
      });

      resolve(scores);
    });
  });
};

export default ytdData;
