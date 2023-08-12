import styled from "styled-components/macro";
import { css } from 'styled-components';


const ComponentsContainer = css`
  background-color: rgb(250, 250, 250);
`;


const PageContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: -webkit-fill-available;
  ${'' /* display: flex;
  align-items: center;
  justify-content: center; */}
  position: relative;
  padding-bottom: 254px;
  padding-top: 80px;
  ${ComponentsContainer }
  
`;







const ComponentsContent1 = styled.div`
  align-self: flex-start;
`;


const ComponentsContent2 = styled.div`
  width: 1224px;
  align-self: flex-start;
  margin: 40px auto 0px;

  @media (max-width: 1304px) {
    width: 100%;
    margin: 0px;
    padding: 16px 16px 0px;
  }
`;


const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;


const Heading = styled.h1`
  font-family: 'Bebas Neue', sans-serif;
  font-weight: 400;
  font-size: 64px;
  line-height: 56px;
  text-transform: uppercase;
`;


const MediaQueryDesktopAndTablet = styled.span`
@media (max-width: 600px) {
    display: none;
}
`;


const ComponentsActions = styled.div`
display: grid;
grid-auto-flow: column;
gap: 8px;
`;


const PrimaryActionsContainer = styled.div`
display: grid;
gap: 16px;
grid-auto-flow: column;
`;


const StartPoolButton = styled.a`
color: rgb(255, 255, 255);
font-family: Inter, sans-serif;
font-weight:700 ;
font-size :12px ;
line-height :24px ;
text-transform :uppercase ;
position :relative ;
display :flex ;
align-items :center ;
justify-content :center ;
border :2px solid transparent ;
border-radius :8px ;
cursor :pointer ;
user-select :none ;
text-decoration :none ;
width :auto ;
text-align :center ;
background-color : rgb(220,53,69) ;
padding :0px 22px ;
height :48px ;

&:hover {
    background-color: rgb(189,33,48);
    color: rgb(255, 255, 255);
    text-decoration: none;
  }
`;



export default function Dashboard() {
  return (
    <PageContainer>
        <ComponentsContent1>
          <ComponentsContent2>
            <HeadingContainer>
              <Heading>Dashboard</Heading>
              <MediaQueryDesktopAndTablet>
                <ComponentsActions>
                  <MediaQueryDesktopAndTablet>
                    <PrimaryActionsContainer>
                      <StartPoolButton
                        data-test-id="dashboardStartAPoolButton"
                        href="/pools/start"
                      >
                        Start A Pool
                      </StartPoolButton>
                    </PrimaryActionsContainer>
                  </MediaQueryDesktopAndTablet>
                </ComponentsActions>
              </MediaQueryDesktopAndTablet>
            </HeadingContainer>
          </ComponentsContent2>
        </ComponentsContent1>
    </PageContainer>
  );
}

