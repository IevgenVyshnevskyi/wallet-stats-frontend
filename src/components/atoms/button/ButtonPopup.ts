import styled from "styled-components";

import COLORS from "../../../shared/styles/variables";

export const ButtonPopup = styled.button<{ isActive: boolean }>`
  color: ${(props) => props.color || COLORS.ALMOST_BLACK_FOR_TEXT};
  font-weight: ${(props) => (props.isActive ? "700" : "400")};
  font-size: 12px;
  width: 188px;
  height: 37px;
  text-align: center;
  background: ${COLORS.BASE_1};
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.isActive ? COLORS.PRIMARY_HOVER : COLORS.DIVIDER)};
  cursor: pointer;
`;
