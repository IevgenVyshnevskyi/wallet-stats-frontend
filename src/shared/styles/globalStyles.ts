import { createGlobalStyle } from "styled-components";
import { ALMOST_BLACK_FOR_TEXT, BASE_1 } from "./variables";
import { fontStyles } from "./fontStyles";

export const GlobalStyles = createGlobalStyle`
  ${fontStyles}

  * {
    margin : 0;
    padding: 0;
    font-family: 'Inter', Arial, sans-serif;
  }
  
  body {
    font-weight: 400;
    background-color: ${BASE_1};
    color: ${ALMOST_BLACK_FOR_TEXT};
  }
`