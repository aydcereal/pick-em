import { app } from "../firebase";
import "firebase/compat/database";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";

import ApiTest from "./ApiTest";

const firebase = app.database();

const PoolDetail = () => {
  const { poolKey, week } = useParams();
  const [poolData, setPoolData] = useState(null);

  useEffect(() => {
    // Define a function to fetch pool data based on the poolKey
    const fetchPoolData = async () => {
      try {
        // Assuming 'pools' is the name of your node in the Realtime Database
        const poolRef = firebase.ref(`pools/${poolKey}`);
        const snapshot = await poolRef.once("value");

        if (snapshot.exists()) {
          // Data for the pool exists
          setPoolData(snapshot.val());
        } else {
          // Pool not found
          console.log("Pool not found");
        }
      } catch (error) {
        console.error("Error fetching pool data:", error);
      }
    };

    // Call the function to fetch pool data
    fetchPoolData();
  }, [poolKey]); // Ensure the effect runs whenever the poolKey changes

  if (!poolData) {
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <SyncLoader color="#dc3545" />
      </div>
    ); // or any other loading indicator
  }

  // Render your component with the fetched pool data
  return (
    <div className="content-area">
      <div className="container">
        <h1>Pick Sheet</h1>
        <h3>Enter Your week {week} picks</h3>

        {/* Render other pool details here */}
        <ApiTest poolKey={poolKey} week={week}></ApiTest>
      </div>
    </div>
  );
};

export default PoolDetail;
