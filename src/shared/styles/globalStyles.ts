import { createGlobalStyle } from "styled-components";
import './variables.ts'
import InterRegular from '../fonts/Inter/static/Inter-Regular.ttf'
import InterMedium from '../fonts/Inter/static/Inter-Medium.ttf'
import InterSemiBold from '../fonts/Inter/static/Inter-SemiBold.ttf'
import InterBold from '../fonts/Inter/static/Inter-Bold.ttf'
import InterExtraBold from '../fonts/Inter/static/Inter-ExtraBold.ttf'
import { ALMOST_BLACK_FOR_TEXT, BASE_1, WHITE } from "./variables";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    src: url(${InterRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterMedium}) format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterSemiBold}) format('truetype');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterBold}) format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterExtraBold}) format('truetype');
    font-weight: 800;
    font-style: normal;
  }

  * {
    margin : 0;
    padding: 0;
    font-family: 'Inter';
  }
  
  body {
    font-weight: 400;
    background-color: ${ALMOST_BLACK_FOR_TEXT};
    background-color: ${BASE_1};
    color: ${WHITE};
  }
`