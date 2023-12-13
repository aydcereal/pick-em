import styled from "styled-components/macro";
import { css } from "styled-components";
import { NavLink } from "react-router-dom";

export const OuterContainer = styled.div`
  position: absolute;
  z-index: 8995;
  top: 100%;
  right: 0px;
  width: 350px;

  &.Hidden {
    display: none;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const MidContainer = styled.div`
  background: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 48px, rgba(0, 0, 0, 0.15) 0px 0px 1px;
  border-radius: 8px;
  overflow: hidden;
`;

export const InnerContainer = styled.div`
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: rgb(93, 98, 104);
`;

export const FlyoutHeader = styled.div`
  padding: 16px 24px;
`;

export const FlyoutTitle = styled.h3`
  font-family: Sohne, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 16px;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  color: black;
  text-transform: lowercase;
`;

export const FlyoutActionsWrapper = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;
