import styled from "styled-components";
import { WHITE, ALMOST_BLACK_FOR_TEXT, MENU_BUTTON_HOVER } from "../../../shared/styles/variables";
import { ButtonTransparent } from '../../atoms/button/ButtonTransparent.styled';

export const CardButton = styled(ButtonTransparent)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  padding: 20px 15px;
  background: ${WHITE};
  border-radius: 8px;
  margin-bottom: 8px;

  &:hover {
    background-color: ${MENU_BUTTON_HOVER};

    h4 {
      color: ${ALMOST_BLACK_FOR_TEXT};
    }

    svg {
      opacity: 1;
    }
  }
`
