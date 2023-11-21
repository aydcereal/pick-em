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
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;  
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    padding-bottom: 254px;
    padding-top: 80px;
  ${ComponentsContainer }
  
`;

export const Body = styled.div `
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    max-width: 840px;
    width: 600px;
    padding: 16px;
`


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
    -webkit-box-pack: justify;
    justify-content: space-between;
    align-items: flex-end;

    
`;


export const Heading = styled.h1`
  font-family: 'Bebas Neue', sans-serif;
  font-weight: 400;
  font-size: 64px;
  line-height: 56px;
  text-transform: uppercase;

  @media (max-width: 600px){
      font-size: 48px;
    }
`;


export const MediaQueryDesktopAndTablet = styled.span`
@media (max-width: 600px) {
    display: none;
}
`;

export const MediaQueryDesktopOnly = styled.span `


  @media (max-width: 1024px){
    display: none;
  }
`


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
    align-items: center;


    @media (max-width: 600px){
        padding-top: 16px;
    }
`

export const SecondaryActionsPartContainer = styled.div`
  -webkit-box-flex: 1;
  flex-grow: 1;
  display: flex;  
  align-items: center;
`

export const DashboardSortSelectSortDropdown = styled.div `
  position: relative;
  display: flex;
  align-items: center;
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
    color: rgb(93, 98, 104);
    

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


export const SortButton = styled.button `
    position: relative;
    padding: 0px;
    text-transform: none;
    color: rgb(93, 98, 104);
    font-family: Inter, sans-serif;
    font-weight: 700;
    font-size: 12px;
    line-height: 24px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    border: 2px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
    text-decoration: none;
    width: auto;
    text-align: center;
    background-color: transparent;
    height: 32px;
  
`



export const SortContainer = styled.div `
height: 100%;
padding-right: 8px;
display: flex;
-webkit-box-align: center;
align-items: center;
`

export const ArrowContainer = styled.div `
  display: flex;
`

export const DisplayStyleButton = styled.div `
  display: flex;
  margin: 0px 32px;

  `
  


  export const DashboardDisplayStyleSwitcherCardsButton = styled.button `
    border: 2px solid transparent;
    border-radius: 8px;
    text-decoration: none;
    background-color: transparent;
    text-align: center;
    fill: black;

    &:visited {
      color: rgb(93, 98, 104);
      text-decoration: none;
    }
  `


  export const StyledSVG = styled.svg`
  path, rect {
    fill: ${props => props.color};
  }

  &:active path, &:active rect {
    fill: ${props => props.activeColor};
  }
`;



export const SearchInputContainer = styled.div`
    width: 270px;
    margin-left: 8px; 
`

export const SearchInputInnerContainer = styled.div `
    position: relative;
    height: 48px;
    background: rgb(240, 242, 245);
    border: 2px solid transparent;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 8px;
    font-family: Inter, sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: rgb(8, 10, 13);
`


export const IconWrapper = styled.div `
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding: 12px 4px 12px 12px;
`

export const InputContainer = styled.div `
    height: 100%;
    display: flex;
    -webkit-box-flex: 1;
    flex-grow: 1;
`


export const SearchPoolInput = styled.input `
position: relative;
    font-family: Inter, sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: rgb(8, 10, 13);
    border: 0px;
    background: transparent;
    display: block;
    outline: none;
    padding: 8px 16px 8px 0px;
    width: 50px;
    height: 100%;
    -webkit-box-flex: 1;
    flex-grow: 1;
    min-height: auto;
    resize: none;
`


export const CopyPoolLinkContainer = styled.div `
      margin-bottom: 8px;
      width: 100%;
      margin-top: 20px;
`


export const PoolLink = styled.button `
  font-family: Inter, sans-serif;
    font-weight: 700;
    font-size: 12px;
    line-height: 24px;
    text-transform: uppercase;
    position: relative;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    border: 2px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
    text-decoration: none;
    width: 100%;
    text-align: center;
    background-color: #dc3545;
    padding: 0px 22px;
    height: 48px;
    color: rgb(255, 255, 255);
`

export const Row = styled.div `

  width: 600px;
   
  &:not(:last-child) {
    margin-bottom: 40px;
  }
  

@media (max-width: 600px) {
    width: 100%;
   
  }

`

export const TileConatiner = styled.div `
    background: rgb(255, 255, 255);
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 3px;
    position: relative;
    transition: box-shadow 100ms ease-in-out 0s;

`

export const ActionAnchor = styled.a `
    color: #0034CE; 
    font-size: 11px;
    text-decoration: none;
  &:hover{
    text-decoration: underline;
  }
`