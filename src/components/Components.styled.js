import styled from "styled-components/macro";
import { css } from 'styled-components';
import { NavLink } from "react-router-dom";


export const ComponentsContainer = css`
  background-color: rgb(250, 250, 250);
`;


export const PageContainer = styled.div`
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


export const ComponentsContent1 = styled.div`
  align-self: flex-start;
`;


export const ComponentsContent2 = styled.div`
  width: 1224px;
  align-self: flex-start;
  margin: 40px auto 0px;

  @media (max-width: 1304px) {
    width: 100%;
    margin: 0px;
    padding: 16px 16px 0px;
  }
`;


export const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


export const Heading = styled.h1`
  font-family: 'Bebas Neue', sans-serif;
  font-weight: 400;
  font-size: 64px;
  line-height: 56px;
  text-transform: uppercase;
`;


export const MediaQueryDesktopAndTablet = styled.span`
@media (max-width: 600px) {
    display: none;
}
`;


export const ComponentsActions = styled.div`
display: grid;
grid-auto-flow: column;
gap: 8px;
`;


export const PrimaryActionsContainer = styled.div`
display: grid;
gap: 16px;
grid-auto-flow: column;
`;


export const StartPoolButton = styled(NavLink)`
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


export const ToolbarContainer = styled.div `
  margin-top: 16px;


  @media (min-width: 601px){
    display: flex;
    -webkit-box-align: center;
    align-items: center;
  }
`



export const NavigationContainer = styled.div`
    -webkit-box-flex: 1;
    flex-grow: 1;
    display: flex;
    -webkit-box-align: center;
    align-items: center;

    @media(max-width: 600px){
        border-bottom: 1px solid rgb(223, 225, 229);
    }
    
`

export const SecondaryActions = styled.div `
    display: flex;
    -webkit-box-align: center;
    align-items: center


    @media(max-width 600px){
        padding-top: 16px;
    }
`


export const SecondaryNav = styled.ul`
    height: 48px;
    display: flex;      
`

export const SecondaryNavItem = styled.li`
    &:not(:last-child){
        margin-right: 32px;
    }
`

export const SecondaryNavLink = styled(NavLink)`
    background: none;
    border-width: 0px 0px 2px;
    border-top-style: initial;
    border-right-style: initial;
    border-left-style: initial;
    border-top-color: initial;
    border-right-color: initial;
    border-left-color: initial;
    border-image: initial;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    border-bottom-style: solid;
    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 12px;
    cursor: pointer;
    text-decoration: none;
    height: 100%;
    border-bottom-color: transparent;
    

    &:visited {
      color: rgb(93, 98, 104);
      text-decoration: none;
    }

    &:active {
    color: rgb(8, 10, 13);
    border-bottom-color: rgb(220,53,69);
    }

&:hover:not(:disabled) {
    color: rgb(8, 10, 13);
    border-bottom-color: rgb(220,53,69);
}
`