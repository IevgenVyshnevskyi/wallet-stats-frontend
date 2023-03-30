import styled from "styled-components"
import { MENU_BUTTON_HOVER, ALMOST_BLACK_FOR_TEXT } from "../../../shared/styles/variables"
import { Link as RouterLink } from 'react-router-dom';

export const LinkMenu = styled(RouterLink)`
  padding: 10px 28px;
  border-radius: 40px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  &:hover {
    background-color: ${MENU_BUTTON_HOVER};
  }

  > svg {
    padding-right: 10px;
  }

  > span {
    color: ${ALMOST_BLACK_FOR_TEXT};
    font-size: 14px;
    font-weight: 600;
  }
`