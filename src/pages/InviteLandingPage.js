import React, { useEffect, useState } from 'react';
import { PageContainer, Row } from "../components/Components.styled";
import { Content } from '../components/Containers.styled';
import { Container } from '../components/PoolComponents.styled';
import { Title, Text } from "../components/Typography.styled";
import { useSearchParams } from "react-router-dom";
import PoolCardContainer from '../components/PoolCardContainer';
import { app } from '../firebase';
import { getDatabase, ref, get } from 'firebase/database';

const database = app.database();

const InviteLandingPage = () => {
  const [searchParams] = useSearchParams();
  const poolID = searchParams.get('poolID');
  const invitationID = searchParams.get('invitationID');
  const [poolData, setPoolData] = useState(null);

  useEffect(() => {
    const fetchPoolData = async () => {
      if (poolID) {
        const poolData = await getPoolData(poolID);
        setPoolData(poolData);
        
      }
    };

    fetchPoolData();
  }, [poolID]);

  const getPoolData = async (poolId) => {
    const poolRef = ref(database, `pools/${poolId}`);

    try {
      const snapshot = await get(poolRef);
      if (snapshot.exists()) {
        const poolData = snapshot.val();
        console.log('Pool Data:', poolData);
        return poolData;
      } else {
        console.log('No such pool exists!');
        return null;
      }
    } catch (error) {
      console.error('Error fetching pool data:', error);
      return null;
    }
  };

  return (
    <PageContainer>
      <Content>
        <Title>
          Join A Pool
        </Title>
        <Row>
          <Text>You’re only one step away from playing! Click the button below to start.</Text>
        </Row>
        <Row>
          <PoolCardContainer poolData={poolData}></PoolCardContainer>
        </Row>
       
      </Content>
    </PageContainer>
  );
};

export default InviteLandingPage;
