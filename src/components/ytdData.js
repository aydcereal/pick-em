import { app } from "../firebase";
import "firebase/compat/database";

const ytdData = () => {
  const poolId = "-NkN4le9I5JNY92sXeUH";
  const playerName = "Half Chubb";

  const database = app.database();
  const selectionRef = database.ref(`selections/${poolId}`);
  selectionRef.orderByChild("poolKey").equalTo(poolId);

  selectionRef.once("value", (snapshot) => {
    const dataObject = snapshot.val();
    console.log(dataObject);

    snapshot.forEach((childSnapshot) => {
      const selectionData = childSnapshot.val();
      const firstObject = Object.values(selectionData)[0];
      console.log(firstObject.playerName);

      if (selectionData.playerName === playerName) {
      }
    });
  });

  return;
};

export default ytdData;
