import React, { useEffect, useState } from "react";
import { PageContainer, Row } from "../components/Components.styled";
import { Content } from "../components/Containers.styled";
import { Title, Text } from "../components/Typography.styled";
import { useSearchParams } from "react-router-dom";
import PoolCardContainer from "../components/PoolCardContainer";
import { app } from "../firebase";
import { ref, get, runTransaction } from "firebase/database";
import AuthContext from "../context/auth-context";
import { useContext } from "react";

const database = app.database();

const InviteLandingPage = () => {
  const [searchParams] = useSearchParams();
  const poolID = searchParams.get("poolID");
  const [poolData, setPoolData] = useState(null);
  const { userData, currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPoolData = async () => {
      if (poolID) {
        const poolData = await getPoolData(poolID);
        setPoolData(poolData);
      }
    };

    fetchPoolData();
  }, [poolID]);

  const joinHandler = async () => {
    const userId = currentUser.uid;
    const poolRef = ref(database, `pools/${poolID}`);

    try {
      await runTransaction(poolRef, (pool) => {
        if (!pool) {
          // Initialize pool if it doesn't exist
          pool = {
            members: {},
          };
        }

        if (!pool.members) {
          pool.members = {};
        }

        if (!pool.members[userId]) {
          // Add user to members with userId and displayName
          pool.members[userId] = {
            userId,
            displayName: userData.displayName || null,
          };
        }

        // Return the updated pool object
        return pool;
      });

      console.log("Document Successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const getPoolData = async (poolId) => {
    const poolRef = ref(database, `pools/${poolId}`);

    try {
      const snapshot = await get(poolRef);
      if (snapshot.exists()) {
        const poolData = snapshot.val();
        console.log("Pool Data:", poolData);
        return poolData;
      } else {
        console.log("No such pool exists!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching pool data:", error);
      return null;
    }
  };

  return (
    <PageContainer>
      <Content>
        <Title>Join A Pool</Title>
        <Row>
          <Text>
            You’re only one step away from playing! Click the button below to
            start.
          </Text>
        </Row>
        <Row>
          <PoolCardContainer
            poolData={poolData}
            display={"block"}
            width={"600px"}
            joinHandler={joinHandler}
          ></PoolCardContainer>
        </Row>
      </Content>
    </PageContainer>
  );
};

export default InviteLandingPage;
