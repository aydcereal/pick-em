import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
   PageContainer, 
   ComponentsContent1, 
   ComponentsContent2, 
   HeadingContainer, 
   Heading, 
   MediaQueryDesktopAndTablet,
   ComponentsActions, 
   PrimaryActionsContainer,
   StartPoolButton,
   ToolbarContainer,
   NavigationContainer,
   SecondaryActions,
   SecondaryNav,
   SecondaryNavItem,
   SecondaryNavLink
   } from "../components/Components.styled";



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
                        to="/pools/start"
                      >
                        Start A Pool
                      </StartPoolButton>
                    </PrimaryActionsContainer>
                  </MediaQueryDesktopAndTablet>
                </ComponentsActions>
              </MediaQueryDesktopAndTablet>
            </HeadingContainer>
            <ToolbarContainer>
              <NavigationContainer>
                <SecondaryNav>
                  <SecondaryNavItem>
                    <SecondaryNavLink to='/dashboard/my-pools'>My pools</SecondaryNavLink>
                  </SecondaryNavItem>
                  <SecondaryNavItem>
                    <SecondaryNavLink to='/dashboard/join-a-pool'>Join A Pool</SecondaryNavLink>
                  </SecondaryNavItem>
                </SecondaryNav>

              </NavigationContainer>
              <SecondaryActions>

              </SecondaryActions>

            </ToolbarContainer>
          </ComponentsContent2>
        </ComponentsContent1>
    </PageContainer>
  );
}

