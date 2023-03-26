import styled from "styled-components";
import { ALMOST_BLACK_FOR_TEXT } from "../../../shared/styles/variables";

export const InputPasswordWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 70px;

  > input {
    font-size: 16px;
    color: ${ALMOST_BLACK_FOR_TEXT};
  }

  > svg {
    position: absolute;
    top: 16px;
    right: -50px;
    cursor: pointer;
  }
`