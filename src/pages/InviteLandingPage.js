import React, { useEffect, useState } from "react";
import { PageContainer, PoolLink, Row } from "../components/Components.styled";
import { Content } from "../components/Containers.styled";
import { Title, Text } from "../components/Typography.styled";
import { useSearchParams } from "react-router-dom";
import PoolCardContainer from "../components/PoolCardContainer";
import { app } from "../firebase";
import { ref, get, runTransaction } from "firebase/database";
import AuthContext from "../context/auth-context";
import { useContext } from "react";
import { fetchPoolData } from "../components/fetchPoolData";
import { SyncLoader } from "react-spinners";

const database = app.database();

const InviteLandingPage = () => {
  const [searchParams] = useSearchParams();
  const poolID = searchParams.get("poolID");
  const [poolData, setPoolData] = useState(null);
  const { userData, currentUser } = useContext(AuthContext);
  const [displayNameExists, setDisplayNameExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPoolData(poolID, (poolData) => {
      setPoolData(poolData);
      setIsLoading(false);
    });
  }, []);

  console.log(userData.displayName);
  console.log(displayNameExists);

  useEffect(() => {
    if (poolData && poolData.members) {
      setDisplayNameExists(
        Object.values(poolData.members).some(
          (member) => member.displayName == userData.displayName
        )
      );
    }
  }, [poolData, userData.displayName]);

  console.log(poolData);

  if (isLoading) {
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
    );
  }

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

  return (
    <PageContainer>
      {displayNameExists ? (
        <Content>
          <Title>YOU’RE IN THIS POOL</Title>
          <Row>
            <Text>
              You’ve joined this pool. You can find it in your dashboard by
              clicking the button below.
            </Text>
          </Row>
          <Row>
            <PoolCardContainer
              poolData={poolData}
              display={"block"}
              width={"600px"}
              button={false}
              joinHandler={joinHandler}
            ></PoolCardContainer>
          </Row>
        </Content>
      ) : (
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
              pools={poolData}
              display={"block"}
              width={"600px"}
              button={true}
              joinHandler={joinHandler}
            ></PoolCardContainer>
          </Row>
        </Content>
      )}
    </PageContainer>
  );
};

export default InviteLandingPage;
