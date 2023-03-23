import { createGlobalStyle } from "styled-components";
import '../styles/variables.css'
import Inter400 from '../fonts/Inter/static/Inter-Regular.ttf'
import Inter700 from '../fonts/Inter/static/Inter-Bold.ttf'

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    src: url(${Inter400}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${Inter700}) format('truetype');
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