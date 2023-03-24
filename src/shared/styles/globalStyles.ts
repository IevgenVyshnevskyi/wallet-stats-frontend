import { createGlobalStyle } from "styled-components";
import './variables.ts'
import InterRegular from '../fonts/Inter/static/Inter-Regular.ttf'
import InterMedium from '../fonts/Inter/static/Inter-Medium.ttf'
import InterBold from '../fonts/Inter/static/Inter-Bold.ttf'

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
    src: url(${InterBold}) format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  * {
    margin : 0;
    padding: 0;
  }
  
  body {
    font-family: 'Inter';
    font-weight: 400;
    background-color: var(--grey);
    color: var(--almost-black);
  }
`