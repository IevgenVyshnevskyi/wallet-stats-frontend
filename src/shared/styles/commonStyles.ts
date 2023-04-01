import { css } from "styled-components";
import { ALMOST_BLACK_FOR_TEXT } from "./variables";

export type commonStylesProps = {
  m?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  p?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  color?: string;
  width?: string;
  height?: string;
  lh?: string;
  textAlight?: string;
}

export const commonStyles = css<commonStylesProps>`
  margin: ${({ m }) => m || undefined};
  margin-top: ${({ mt }) => mt || undefined};
  margin-right: ${({ mr }) => mr || undefined};
  margin-bottom: ${({ mb }) => mb || undefined};
  margin-left: ${({ ml }) => ml || undefined};
  padding: ${({ p }) => p || undefined};
  padding-top: ${({ pt }) => pt || undefined};
  padding-right: ${({ pr }) => pr || undefined};
  padding-bottom: ${({ pb }) => pb || undefined};
  padding-left: ${({ pl }) => pl || undefined};
  color: ${({ color }) => color || ALMOST_BLACK_FOR_TEXT};
  width: ${({ width }) => width || undefined};
  height: ${({ height }) => height || undefined};
  line-height: ${({ lh }) => lh || undefined};
  
  text-align: ${({ textAlight }) => textAlight || undefined};
`