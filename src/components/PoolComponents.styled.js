import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";







export const MainContainer = styled.div `
    margin-top: 32px;

    @media (max-width: 1304px){
        width: 100vw;
        padding: 0px 16px 16px;
        margin: 0px;
    }
`



export const SectionItems = styled.ul `
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-wrap: wrap;

    
`

export const SectionItem = styled.li `
    margin-bottom: 16px;
    width: calc(50% - 8px);
    

    @media (max-width: 900px){
        width:100%;
    }
`

export const PoolCardDefaultContainer = styled.div `
    background: rgb(255,255,255);
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 3px;
    position: relative;
    transition: box-shadow 100ms ease-in-out 0s;

    &:hover {
        box-shadow: 0px 20px 48px rgba(0,0,0,0.1);
    }


`

export const TopContainer = styled(NavLink) `
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    margin: 0px 20px;
    padding: 20px 0px;
    border-bottom: 1px solid rgb(240, 242, 245);
    text-decoration: none;
    color: black;
    
   
`

export const Container = styled.div `
        display: flex;
    -webkit-box-align: start;
    align-items: start;
    min-width: 0px;
`

export const Avatar = styled.div `
    background: rgb(0, 52, 206);
    position: relative;
    flex-shrink: 0;
    width: 64px;
    height: 64px;
    border-radius: 100em;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    
`

export const HeadingContainer = styled.div `
    margin-left: 20px;
    min-width: 0px;
`

export const TitleContainer = styled.h3 `
    overflow: hidden;
    display:flex;
`

export const Title = styled.span `
    font-family: Inter, sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    display: inline-block;
    margin-right: 4px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100%;
    color: inherit;
    text-decoration: inherit;
`

export const Category = styled.div`
    font-family: Inter, sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: rgb(93, 98, 104);
`

export const BottomContainer = styled.div `
    padding: 20px 0px 20px 20px;
    display: flex;
    justify-content: space-between;
    
`

export const BottomContainerSlot = styled.div `
    display: flex;
    align-items:center;
`

export const ActionsContainer = styled.div `
    display: grid;
    grid-auto-flow: column;
    margin: 0px 8px;
    gap: 8px;
    
    
`

export const MoreActionsDropdownButton = styled.button`
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 24px;
  text-transform: uppercase;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  text-align: center;
  background-color: transparent;
  height: 32px;
  padding: 0px 0px;
  width: auto;
  color: rgb(148, 154, 157); /* Default color */
  transition: color 0.3s ease; /* Add a transition for a smoother effect */

  

  &:hover {
    background-color: rgb(240, 242, 245);
    color: rgb(148, 154, 157);
    text-decoration: none;
  }
`;

