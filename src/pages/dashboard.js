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
  ArrowContainer,
  MediaQueryDesktopOnly,
  DisplayStyleButton,
  DashboardDisplayStyleSwitcherCardsButton,
  StyledSVG,
  SearchInputContainer,
  SearchInputInnerContainer,
  IconWrapper,
  InputContainer,
  SearchPoolInput,
} from "../components/Components.styled";

import PoolCardContainer from "../components/PoolCardContainer";
import AuthContext from "../context/auth-context";
import { useContext, useState } from "react";
import { app } from "../firebase";
import "firebase/compat/database";
import { useEffect } from "react";

const database = app.database();

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const [pools, setPools] = useState([]);

  const currentUser = authContext && authContext.currentUser;

  console.log(currentUser);

  const currentUserID = currentUser && currentUser.uid;

  useEffect(() => {
    database
      .ref("pools")
      .orderByChild(`members/${currentUserID}/userId`) // Check if userId exists in the members object
      .startAt("") // Start at an empty string to include all nodes with the specified child key
      .endAt("\uf8ff") // End at '\uf8ff' to include all nodes with the specified child key
      .on("value", (snapshot) => {
        const newPools = [];
        snapshot.forEach((childSnapshot) => {
          const pool = childSnapshot.val();
          pool.key = childSnapshot.key;
          newPools.push(pool);
        });

        setPools(newPools);
      });
  }, [currentUserID]);

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
                  <SecondaryNavLink to="/dashboard/my-pools">
                    My pools
                  </SecondaryNavLink>
                </SecondaryNavItem>
                <SecondaryNavItem>
                  <SecondaryNavLink to="/dashboard/join-a-pool">
                    Join A Pool
                  </SecondaryNavLink>
                </SecondaryNavItem>
              </SecondaryNav>
            </NavigationContainer>
            <SecondaryActions>
              <SecondaryActionsPartContainer>
                <DashboardSortSelectSortDropdown>
                  <SortButton>
                    Sort by Start Date
                    <SortContainer>
                      <ArrowContainer>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10 4H2L6 8L10 4Z" fill="#5D6268"></path>
                        </svg>
                      </ArrowContainer>
                    </SortContainer>
                  </SortButton>
                  <MediaQueryDesktopOnly>
                    <DisplayStyleButton>
                      <DashboardDisplayStyleSwitcherCardsButton>
                        <div>
                          <StyledSVG
                            color="rgb(93,98,104)"
                            activeColor="black"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1"
                              y="2"
                              width="7"
                              height="7"
                              rx="2"
                              fill="#080A0D"
                            ></rect>
                            <rect
                              x="1"
                              y="11"
                              width="7"
                              height="7"
                              rx="2"
                              fill="#080A0D"
                            ></rect>
                            <path
                              d="M10 3C9.44772 3 9 3.44772 9 4C9 4.55228 9.44772 5 10 5V3ZM18 5C18.5523 5 19 4.55228 19 4C19 3.44772 18.5523 3 18 3V5ZM10 5L18 5V3L10 3V5Z"
                              fill="#080A0D"
                            ></path>
                            <path
                              d="M10 12C9.44772 12 9 12.4477 9 13C9 13.5523 9.44772 14 10 14V12ZM18 14C18.5523 14 19 13.5523 19 13C19 12.4477 18.5523 12 18 12V14ZM10 14L18 14V12L10 12V14Z"
                              fill="#080A0D"
                            ></path>
                            <path
                              d="M10 6C9.44772 6 9 6.44772 9 7C9 7.55228 9.44772 8 10 8V6ZM15 8C15.5523 8 16 7.55228 16 7C16 6.44772 15.5523 6 15 6V8ZM10 8L15 8V6L10 6V8Z"
                              fill="#080A0D"
                            ></path>
                            <path
                              d="M10 15C9.44772 15 9 15.4477 9 16C9 16.5523 9.44772 17 10 17V15ZM15 17C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15V17ZM10 17H15V15H10V17Z"
                              fill="#080A0D"
                            ></path>
                          </StyledSVG>
                        </div>
                      </DashboardDisplayStyleSwitcherCardsButton>
                      <DashboardDisplayStyleSwitcherCardsButton>
                        <div>
                          <StyledSVG
                            color="rgb(93,98,104)"
                            activeColor="black"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7 3C6.44772 3 6 3.44772 6 4C6 4.55228 6.44772 5 7 5V3ZM18 5C18.5523 5 19 4.55228 19 4C19 3.44772 18.5523 3 18 3V5ZM7 5L18 5V3L7 3V5Z"
                              fill="#5D6268"
                            ></path>
                            <path
                              d="M7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11V9ZM18 11C18.5523 11 19 10.5523 19 10C19 9.44772 18.5523 9 18 9V11ZM7 11L18 11V9L7 9V11Z"
                              fill="#5D6268"
                            ></path>
                            <path
                              d="M7 15C6.44772 15 6 15.4477 6 16C6 16.5523 6.44772 17 7 17V15ZM18 17C18.5523 17 19 16.5523 19 16C19 15.4477 18.5523 15 18 15V17ZM7 17H18V15L7 15V17Z"
                              fill="#5D6268"
                            ></path>
                            <circle
                              cx="2.5"
                              cy="4"
                              r="1.5"
                              fill="#5D6268"
                            ></circle>
                            <circle
                              cx="2.5"
                              cy="10"
                              r="1.5"
                              fill="#5D6268"
                            ></circle>
                            <circle
                              cx="2.5"
                              cy="16"
                              r="1.5"
                              fill="#5D6268"
                            ></circle>
                          </StyledSVG>
                        </div>
                      </DashboardDisplayStyleSwitcherCardsButton>
                    </DisplayStyleButton>
                  </MediaQueryDesktopOnly>
                  <MediaQueryDesktopOnly>
                    <SearchInputContainer>
                      <SearchInputInnerContainer>
                        <IconWrapper>
                          <StyledSVG
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.371 4.888 14.113C3.62933 12.8543 3 11.3167 3 9.5C3 7.68333 3.62933 6.14567 4.888 4.887C6.146 3.629 7.68333 3 9.5 3C11.3167 3 12.8543 3.629 14.113 4.887C15.371 6.14567 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.325 18.925C20.5083 19.1083 20.6 19.3333 20.6 19.6C20.6 19.8667 20.5 20.1 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5627 11.8127 14 10.75 14 9.5C14 8.25 13.5627 7.18733 12.688 6.312C11.8127 5.43733 10.75 5 9.5 5C8.25 5 7.18733 5.43733 6.312 6.312C5.43733 7.18733 5 8.25 5 9.5C5 10.75 5.43733 11.8127 6.312 12.688C7.18733 13.5627 8.25 14 9.5 14Z"
                              fill="#949A9D"
                            ></path>
                          </StyledSVG>
                        </IconWrapper>
                        <InputContainer>
                          <SearchPoolInput
                            data-test-id="dashboardSearchInput"
                            id="search"
                            name="search"
                            placeholder="Search My Pools"
                            type="text"
                          ></SearchPoolInput>
                        </InputContainer>
                      </SearchInputInnerContainer>
                    </SearchInputContainer>
                  </MediaQueryDesktopOnly>
                </DashboardSortSelectSortDropdown>
              </SecondaryActionsPartContainer>
            </SecondaryActions>
          </ToolbarContainer>
        </ComponentsContent2>

        <PoolCardContainer pools={pools} display={"flex"}></PoolCardContainer>
      </ComponentsContent1>
    </PageContainer>
  );
}
