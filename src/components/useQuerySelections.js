import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/auth-context";
import { app } from "../firebase";
import "firebase/compat/database";

const useQuerySelections = (
  updateStatesFromQuery,
  poolId,
  setCurrentSelectedWeek
) => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;

  const [selections, setSelections] = useState([]);
  const [matchingWeek, setMatchingWeek] = useState(false);
  const [currentSelectedWeekLocal, setCurrentSelectedWeekLocal] = useState(2);

  useEffect(() => {
    if (!userId) {
      // currentUser is null or undefined, handle accordingly (maybe redirect to login?)
      return;
    }

    const database = app.database();
    const dataRef = database.ref("selections");

    const onDataChange = (snapshot) => {
      console.log("OnData");
      const dataObject = snapshot.val();
      if (dataObject) {
        const userData = Object.values(dataObject).find(
          (item) =>
            item.userId === userId &&
            item.poolKey === poolId &&
            item.week === parseInt(currentSelectedWeekLocal)
        );
        if (userData) {
          const newSelections = userData.selections || [];
          if (!arraysEqual(selections, newSelections)) {
            setSelections(newSelections);
            setMatchingWeek(true);
            updateStatesFromQuery(
              newSelections,
              true,
              currentSelectedWeekLocal
            );
          }
        } else {
          if (matchingWeek) {
            setMatchingWeek(false);
            updateStatesFromQuery([], false, currentSelectedWeekLocal);
          }
        }
      } else {
        if (matchingWeek) {
          setMatchingWeek(false);
          updateStatesFromQuery([], false, currentSelectedWeekLocal);
        }
      }
    };

    dataRef.on("value", onDataChange);

    return () => {
      dataRef.off("value", onDataChange);
    };
  }, [
    currentSelectedWeekLocal,
    userId,
    poolId,
    selections,
    matchingWeek,
    updateStatesFromQuery,
  ]);

  useEffect(() => {
    setCurrentSelectedWeek(currentSelectedWeekLocal);
  }, [currentSelectedWeekLocal, setCurrentSelectedWeek]);
};

// Helper function to compare two arrays
function arraysEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

export default useQuerySelections;
