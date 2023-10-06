import { app } from '../firebase';
import 'firebase/compat/database';  
import { useState } from 'react';
import AuthContext from '../context/auth-context';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const firebase = app.database();

const PoolDetail = () => {
  const { poolKey } = useParams();
  const [poolData, setPoolData] = useState(null);

  useEffect(() => {
    // Define a function to fetch pool data based on the poolKey
    const fetchPoolData = async () => {
      try {
        // Assuming 'pools' is the name of your node in the Realtime Database
        const poolRef = firebase.ref(`pools/${poolKey}`);
        const snapshot = await poolRef.once('value');

        if (snapshot.exists()) {
          // Data for the pool exists
          setPoolData(snapshot.val());
        } else {
          // Pool not found
          console.log('Pool not found');
        }
      } catch (error) {
        console.error('Error fetching pool data:', error);
      }
    };

    // Call the function to fetch pool data
    fetchPoolData();
  }, [poolKey]); // Ensure the effect runs whenever the poolKey changes

  if (!poolData) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  // Render your component with the fetched pool data
  return (
    <div>
      <h1>{poolData.poolName}</h1>
      {/* Render other pool details here */}
    </div>
  );
};

export default PoolDetail;