import { css } from "styled-components";

import COLORS from "./variables";

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
  display?: string;
  flex?: string;
  direction?: string;
  gap?: string;
  bgColor?: string;
  grow?: string;
  basis?: string;
  wrap?: string;
  justifyContent?: string;
  alignItems?: string;
  fz?: string;
  fw?: string;
  position?: string;
  zIndex?: string;
  overflow?: string;
  borderRadius?: string;
  tabindex?: string;
  border?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  cursor?: string;
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
  color: ${({ color }) => color || COLORS.ALMOST_BLACK_FOR_TEXT};
  width: ${({ width }) => width || undefined};
  height: ${({ height }) => height || undefined};
  line-height: ${({ lh }) => lh || undefined};
  
  text-align: ${({ textAlight }) => textAlight || undefined};
  display: ${({ display }) => display || 'block'};
  flex: ${({ flex }) => flex || 'flex'};
  flex-direction: ${({ direction }) => direction || 'block'};
  gap: ${({ gap }) => gap || 'block'};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  flex-grow: ${({ grow }) => grow || undefined};
  flex-basis: ${({ basis }) => basis || undefined};
  flex-wrap: ${({ wrap }) => wrap && "wrap" || undefined};
  justify-content: ${({ justifyContent }) => justifyContent || undefined};
  align-items: ${({ alignItems }) => alignItems || undefined};
  font-size: ${({ fz }) => fz || undefined};
  font-weight: ${({ fw }) => fw || undefined};
  position: ${({ position }) => position || "static"};
  z-index: ${({ zIndex }) => zIndex || 0};
  overflow: ${({ overflow }) => overflow || undefined};
  border-radius: ${({ borderRadius }) => borderRadius || undefined};
  tabindex: ${({ tabindex }) => tabindex || undefined};
  border: ${({ border }) => border || undefined};
  top: ${({ top }) => top || undefined};
  bottom: ${({ bottom }) => bottom || undefined};
  left: ${({ left }) => left || undefined};
  right: ${({ right }) => right || undefined};
  cursor: ${({ cursor }) => cursor || undefined};
`