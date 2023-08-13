
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
   SecondaryNavLink,
   SecondaryActionsPartContainer,
   DashboardSortSelectSortDropdown,
   SortButton,
   SortContainer,
   arrowContainer,
   MediaQueryDesktopOnly,
   DisplayStyleButton,
   DashboardDisplayStyleSwitcherCardsButton

   } from "../components/Components.styled";

   import { useLocation } from "react-router-dom";
   import MyPools from "./MyPools";
   import Arrow from '../images/down_arrow.png'



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
                <SecondaryActionsPartContainer>
                  <DashboardSortSelectSortDropdown>
                    
                    <SortButton>
                        Sort by Start Date
                        <SortContainer>
                          <arrowContainer>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" 
                              xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 4H2L6 8L10 4Z" fill="#5D6268"></path></svg>
                          </arrowContainer>
                    </SortContainer>

                    </SortButton>
                    <MediaQueryDesktopOnly>
                      <DisplayStyleButton>
                        <DashboardDisplayStyleSwitcherCardsButton>
                          <div>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="2" width="7" height="7" rx="2" fill="#080A0D"></rect><rect x="1" y="11" width="7" height="7" rx="2" fill="#080A0D"></rect><path d="M10 3C9.44772 3 9 3.44772 9 4C9 4.55228 9.44772 5 10 5V3ZM18 5C18.5523 5 19 4.55228 19 4C19 3.44772 18.5523 3 18 3V5ZM10 5L18 5V3L10 3V5Z" fill="#080A0D"></path><path d="M10 12C9.44772 12 9 12.4477 9 13C9 13.5523 9.44772 14 10 14V12ZM18 14C18.5523 14 19 13.5523 19 13C19 12.4477 18.5523 12 18 12V14ZM10 14L18 14V12L10 12V14Z" fill="#080A0D"></path><path d="M10 6C9.44772 6 9 6.44772 9 7C9 7.55228 9.44772 8 10 8V6ZM15 8C15.5523 8 16 7.55228 16 7C16 6.44772 15.5523 6 15 6V8ZM10 8L15 8V6L10 6V8Z" fill="#080A0D"></path><path d="M10 15C9.44772 15 9 15.4477 9 16C9 16.5523 9.44772 17 10 17V15ZM15 17C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15V17ZM10 17H15V15H10V17Z" fill="#080A0D"></path></svg>
                          </div>

                        </DashboardDisplayStyleSwitcherCardsButton>
                        <DashboardDisplayStyleSwitcherCardsButton>
                          <div>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 3C6.44772 3 6 3.44772 6 4C6 4.55228 6.44772 5 7 5V3ZM18 5C18.5523 5 19 4.55228 19 4C19 3.44772 18.5523 3 18 3V5ZM7 5L18 5V3L7 3V5Z" fill="#080A0D"></path><path d="M7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11V9ZM18 11C18.5523 11 19 10.5523 19 10C19 9.44772 18.5523 9 18 9V11ZM7 11L18 11V9L7 9V11Z" fill="#080A0D"></path><path d="M7 15C6.44772 15 6 15.4477 6 16C6 16.5523 6.44772 17 7 17V15ZM18 17C18.5523 17 19 16.5523 19 16C19 15.4477 18.5523 15 18 15V17ZM7 17H18V15L7 15V17Z" fill="#080A0D"></path><circle cx="2.5" cy="4" r="1.5" fill="#080A0D"></circle><circle cx="2.5" cy="10" r="1.5" fill="#080A0D"></circle><circle cx="2.5" cy="16" r="1.5" fill="#080A0D"></circle></svg>
                          </div>

                        </DashboardDisplayStyleSwitcherCardsButton>


                      </DisplayStyleButton>
                    </MediaQueryDesktopOnly>

                    

                    
                    


                 
                    
                     
                    
                    
                  </DashboardSortSelectSortDropdown>
                </SecondaryActionsPartContainer>
              </SecondaryActions>

            </ToolbarContainer>
          </ComponentsContent2>
        </ComponentsContent1>
    </PageContainer>
  );
}

