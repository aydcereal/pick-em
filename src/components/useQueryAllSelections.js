import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/auth-context";
import { app } from "../firebase";
import "firebase/compat/database";

const useQueryAllSelections = (
  updateStatesFromQuery,
  poolId,
  setCurrentSelectedWeek
) => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;

  const [selections, setSelections] = useState([]);
  const [matchingWeek, setMatchingWeek] = useState(false);
  const [currentSelectedWeekLocal, setCurrentSelectedWeekLocal] = useState(1);

  useEffect(() => {
    if (!userId) {
      // currentUser is null or undefined, handle accordingly (maybe redirect to login?)
      return;
    }

    const database = app.database();
    const dataRef = database.ref("selections");

    dataRef.on("value", (snapshot) => {
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
            // Check if the selections have changed before updating the state
            setSelections(newSelections);
            setMatchingWeek(true);
            // Call the updateStatesFromQuery function to update the states in Picks
            updateStatesFromQuery(
              newSelections,
              true,
              currentSelectedWeekLocal
            );
          }
        } else {
          if (matchingWeek) {
            // If there was a match before, but not anymore, update the state
            setMatchingWeek(false);
            updateStatesFromQuery([], false, currentSelectedWeekLocal);
          }
        }
      } else {
        if (matchingWeek) {
          // If there was a match before, but not anymore, update the state
          setMatchingWeek(false);
          updateStatesFromQuery([], false, currentSelectedWeekLocal);
        }
      }
    });

    // Cleanup function
    return () => {
      dataRef.off(); // Remove the listener when the component unmounts
    };
  }, [
    currentSelectedWeekLocal,
    userId,
    poolId,
    selections,
    matchingWeek,
    updateStatesFromQuery,
  ]);

  // No need to return anything if you don't want to render anything

  // Update the parent component's state when the local currentSelectedWeek changes
  useEffect(() => {
    setCurrentSelectedWeek(currentSelectedWeekLocal);
  }, [currentSelectedWeekLocal, setCurrentSelectedWeek]);

  // Add dependencies as needed to avoid unnecessary re-renders
  // Example: [userId, poolId, currentSelectedWeekLocal]
};

// Helper function to compare two arrays
function arraysEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

export default useQueryAllSelections;
