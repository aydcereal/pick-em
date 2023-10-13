import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";



export const FlyoutContainer = styled.div `

    position: absolute;
    min-width: 100%;
    width: max-content;
    z-index: 8995;
    top: 100%;
    right: 0px;
`

export const FlyoutSubContainer = styled.div `
    background: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 48px, rgba(0, 0, 0, 0.15) 0px 0px 1px;
    border-radius: 8px;
    overflow: hidden;
`

export const FlyoutListItem = styled(NavLink) `
    &:not(:last-child){
        border-bottom: 0px;
    }

    &:first-child {
        margin-top: 4px;
    }
    &:hover {
        color: rgb(8, 10, 13);
        background-color: rgb(240, 242, 245);
        text-decoration: none;
    }


    font-family: Inter, sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    min-height: 32px;
    margin: 0px 4px 4px;
    border-radius: 8px;
    padding: 4px 14px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    color: rgb(8, 10, 13);

`