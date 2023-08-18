import styled from "styled-components/macro";






export const MainContainer = styled.div `
    margin-top: 32px;
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
`

export const PoolCardDefault_Container = styled.div `
    background: rgb(255,255,255);
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 3px;
    position: relative;
    transition: box-shadow 100ms ease-in-out 0s;
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
`