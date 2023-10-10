import styled from "styled-components/macro";



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