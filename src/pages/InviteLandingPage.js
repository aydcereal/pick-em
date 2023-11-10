import React, { useEffect, useState } from 'react';
import { PageContainer } from "../components/Components.styled";
import { Container } from '../components/PoolComponents.styled';
import { Title } from "../components/Typography.styled";
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
        console.log(poolData.poolName);
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
      <Container>
        <Title>
          Join A Pool
        </Title>
        <PoolCardContainer></PoolCardContainer>
      </Container>
    </PageContainer>
  );
};

export default InviteLandingPage;
