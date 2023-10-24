import { 
    MainContainer,
    SectionItems,
    SectionItem,
    PoolCardDefaultContainer,
    TopContainer,
    Container,
    Avatar,
    HeadingContainer,
    TitleContainer,
    Title,
    Category,
    BottomContainer,
    BottomContainerSlot,
    ActionsContainer,
    ActionsSubContainer,
    MoreActionsDropdownButton,

    
} from "./PoolComponents.styled";
import FlyoutMoreActions from "./FlyoutMoreActions";
import { useState } from "react";
import { useEffect } from "react";




export default function PoolCardContainer (props) {

    


    
    
    
    const [shouldHideStates, setShouldHideStates] = useState([]);

    console.log('final '+ shouldHideStates);

    useEffect(() => {
        // Initialize the state with the default values after the component has mounted
        const initialShouldHideStates = Array(props.pools.length).fill(true);
        setShouldHideStates(initialShouldHideStates);
      }, [props.pools]);

  

    // Function to toggle the state for a specific component
    const handleFlyoutMenuClick = (index) => {
        const newShouldHideStates = [... shouldHideStates];
        newShouldHideStates[index] = !newShouldHideStates[index];
        setShouldHideStates(newShouldHideStates)
    };


    

    

    

    return (


        <MainContainer>
            <SectionItems>
                {props.pools.map((pool, index) => (
                    
                        
                <SectionItem key={index}>
                    
                    <PoolCardDefaultContainer>
                        
                        
                        <TopContainer to={`/pools/${pool.key}`}>
                            <Container>
                            <Avatar>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M11.5 0.75C7.38432 0.75 4.46285 2.75418 2.64207 5.14396C0.879731 7.45703 0.0712728 10.2355 0.250124 12.0532C0.258879 13.9472 0.733983 15.5668 1.27369 16.7811C1.80952 17.9868 2.43466 18.8489 2.7929 19.2071C2.98043 19.3946 3.23479 19.5 3.5 19.5H5.74087L10.0144 21.8742C10.027 21.8812 10.0398 21.8879 10.0528 21.8944C10.5412 22.1386 11.1025 22.1706 11.5974 22.0877C12.1049 22.0027 12.6292 21.784 13.0753 21.4212C14.0349 20.6408 14.4931 19.317 13.9487 17.6838C13.8375 17.3503 13.7336 17.0395 13.6365 16.75H15.1091C15.2333 17.3705 15.3707 18.0279 15.5238 18.7169C15.9618 20.6877 17.0033 21.8362 18.3646 22.4272C19.6278 22.9756 21.0813 22.9987 22.2488 23.0002C23.0802 23.0013 23.75 22.3265 23.75 21.5V16.5C23.75 15.5335 22.9665 14.75 22 14.75H16.7598C16.6881 14.3661 16.6214 14.0016 16.5588 13.6581L16.5204 13.4473C16.3998 12.7856 16.2909 12.1879 16.1872 11.6838C18.3232 11.3902 20.7359 11.1188 21.8604 10.9939C22.1414 10.9627 22.396 10.814 22.5612 10.5847C22.7265 10.3554 22.787 10.0669 22.7278 9.79048C21.9155 5.99969 18.6262 0.75 11.5 0.75ZM14.2062 11.9795L14.1644 11.9864C13.0862 12.1661 12.7083 12.5256 12.5766 12.719C12.4375 12.9234 12.44 13.1367 12.4701 13.2575C12.5002 13.3775 12.606 13.6988 12.8543 14.4327L12.962 14.7507C12.9746 14.7502 12.9873 14.75 13 14.75H14.7256C14.6786 14.4954 14.6339 14.2509 14.5912 14.0169L14.5725 13.9144C14.4272 13.1177 14.3098 12.4738 14.2062 11.9795ZM2.24388 11.8896C2.11236 10.7058 2.68054 8.39356 4.23293 6.35604C5.74549 4.37082 8.11568 2.75 11.5 2.75C16.7378 2.75 19.4603 6.12963 20.4762 9.13705C18.6405 9.34676 15.7771 9.69002 13.8356 10.0136C12.4138 10.2506 11.4583 10.8078 10.9234 11.5935C10.3959 12.3683 10.3934 13.1966 10.5299 13.7425C10.5853 13.9644 10.7295 14.3932 10.9598 15.0737L11.0794 15.4268L11.0794 15.4269C11.3122 16.1142 11.6295 17.0508 12.0513 18.3162C12.3584 19.2374 12.0666 19.6637 11.8133 19.8696C11.653 20 11.4551 20.0836 11.267 20.1151C11.1749 20.1306 11.0961 20.1316 11.0362 20.1251C11.0069 20.122 10.9845 20.1173 10.969 20.113C10.9626 20.1112 10.9577 20.1096 10.9542 20.1083L6.48564 17.6258C6.33708 17.5433 6.16994 17.5 6 17.5H3.96854C3.74382 17.193 3.41444 16.6734 3.10131 15.9689C2.64607 14.9446 2.25 13.5831 2.25 12C2.25 11.9631 2.24796 11.9262 2.24388 11.8896ZM21.75 17.85H17.3811C17.2993 17.4728 17.2223 17.1059 17.1496 16.75H21.75V17.85ZM18.1677 19.85H21.75V20.9962C20.7486 20.9796 19.8743 20.9022 19.161 20.5926C18.7982 20.4351 18.4571 20.2082 18.1677 19.85ZM8.375 17.15C9.13439 17.15 9.75 16.5344 9.75 15.775C9.75 15.0156 9.13439 14.4 8.375 14.4C7.61561 14.4 7 15.0156 7 15.775C7 16.5344 7.61561 17.15 8.375 17.15Z" fill="#fff"></path></svg>
                            </Avatar>
                            <HeadingContainer>
                                <TitleContainer>
                                    <Title>
                                        {pool.poolName}
                                    </Title>
                                    
                                </TitleContainer>
                                <Category>NFL Pick 'em</Category>
                            </HeadingContainer>

                            </Container>
                            
                        </TopContainer>
                        <BottomContainer>
                            <BottomContainerSlot>
                                
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                    <path
                                    fill="#2c3e50"
                                    d="M8.406 1041.1c-2.885 1.3-4.978 4-5.344 7.3 0 1.1.833 2 1.938 2h14c1.105 0 1.938-.9 1.938-2-.366-3.3-2.459-6-5.344-7.3-.649 1.3-2.011 2.3-3.594 2.3s-2.945-1-3.594-2.3z"
                                    transform="translate(0 -1028.4)"
                                ></path>
                                <path
                                    fill="#34495e"
                                    d="M17 1035.4a5 5 0 11-10 0 5 5 0 1110 0z"
                                    transform="translate(0 -1028.4)"
                                ></path>
                                <path
                                    fill="#34495e"
                                    d="M12 1039.4a8.952 8.952 0 00-3.594.75 9.025 9.025 0 00-5.344 7.25c0 1.105.833 2 1.938 2h14c1.105 0 1.938-.895 1.938-2a9.027 9.027 0 00-5.344-7.25 8.955 8.955 0 00-3.594-.75z"
                                    transform="translate(0 -1028.4)"
                                ></path>
                            </svg>
                                1
                            </BottomContainerSlot>
                            <BottomContainerSlot>
                                <ActionsContainer>
                                    <ActionsSubContainer>
                                    <MoreActionsDropdownButton onClick={() => {
                                                    handleFlyoutMenuClick(index);
                                                }}>
                                        <span >
                                        <svg   width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 20.125C11.45 20.125 10.9793 19.9293 10.588 19.538C10.196 19.146 10 18.675 10 18.125C10 17.575 10.196 17.104 10.588 16.712C10.9793 16.3207 11.45 16.125 12 16.125C12.55 16.125 13.021 16.3207 13.413 16.712C13.8043 17.104 14 17.575 14 18.125C14 18.675 13.8043 19.146 13.413 19.538C13.021 19.9293 12.55 20.125 12 20.125ZM12 14.125C11.45 14.125 10.9793 13.929 10.588 13.537C10.196 13.1457 10 12.675 10 12.125C10 11.575 10.196 11.104 10.588 10.712C10.9793 10.3207 11.45 10.125 12 10.125C12.55 10.125 13.021 10.3207 13.413 10.712C13.8043 11.104 14 11.575 14 12.125C14 12.675 13.8043 13.1457 13.413 13.537C13.021 13.929 12.55 14.125 12 14.125ZM12 8.125C11.45 8.125 10.9793 7.929 10.588 7.537C10.196 7.14567 10 6.675 10 6.125C10 5.575 10.196 5.10433 10.588 4.713C10.9793 4.321 11.45 4.125 12 4.125C12.55 4.125 13.021 4.321 13.413 4.713C13.8043 5.10433 14 5.575 14 6.125C14 6.675 13.8043 7.14567 13.413 7.537C13.021 7.929 12.55 8.125 12 8.125Z" fill="#949A9D"></path></svg>
                                        </span>
                                        
                                    </MoreActionsDropdownButton>
                                    <FlyoutMoreActions shouldHide={shouldHideStates[index]} poolKey={pool.key}></FlyoutMoreActions>
                                  
                                    </ActionsSubContainer>
                                </ActionsContainer>
                            </BottomContainerSlot>                      
                        </BottomContainer>
                    </PoolCardDefaultContainer>
                </SectionItem>
                ))}
            </SectionItems>
        </MainContainer>




        

        
    )
}