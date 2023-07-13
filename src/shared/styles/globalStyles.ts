import { createGlobalStyle } from "styled-components";

import { fontStyles } from "./fontStyles";

import COLORS from "./variables";

export const GlobalStyles = createGlobalStyle`
  ${fontStyles}

  * {
    margin : 0;
    padding: 0;
    font-family: 'Inter', Arial, sans-serif;
  }
  
  body {
    font-weight: 400;
    background-color: ${COLORS.BASE_1};
    color: ${COLORS.ALMOST_BLACK_FOR_TEXT};
  }

  ::-webkit-scrollbar {
    width: 8px;
    background: #E5E5E9;
    border-radius: 16px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }

  scrollbar-width: thin;

  scrollbar-color: #ccc #f5f5f5;
`;
