import styled from "styled-components";
import { DIVIDER } from "../../../shared/styles/variables";
import { Box } from './../../atoms/box/Box.styled';
import { Typography } from './../../atoms/typography/Typography.styled';
import { ALMOST_BLACK_FOR_TEXT } from './../../../shared/styles/variables';
import { List } from "../../atoms/list/List.styled";

export const StyledHeader = styled.nav`
  display: flex;
  align-items: center;
  padding: 12px 50px;
  border-bottom: 2px solid ${DIVIDER};
  
  ${Box} {
    &:first-child {
      margin-right: 56px;
    }
    
    > a {
      display: flex;
      align-items: center;
      gap: 5px;
      text-decoration: none;
  
      ${Typography} {
        user-select: none;
        font-weight: 800;
        font-size: 20px;
        color: ${ALMOST_BLACK_FOR_TEXT};
      }
    }

    &:last-child {
      display: flex;
      align-items: center;
      gap: 40px;
    }
  }

  ${List} {
    display: flex;
    flex-grow: 1;
  }
`