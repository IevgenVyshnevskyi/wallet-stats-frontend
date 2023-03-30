import styled from "styled-components";
import { commonStyles, commonStylesProps } from "../../../shared/styles/commonStyles";

type BoxProps = commonStylesProps & {
  bgColor?: string;
  display?: string;
  direction?: string;
  grow?: string;
  basis?: string;
  wrap?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderLeft?: string;
  borderBottom?: string;
  borderRadius?: string;

  maxWidth?: string;
  maxHeight?: string;
  textAlign?: string;
  background?: string;    //
  position?: string;
  zIndex?: string;
  height?: string;   //
  flexDirection?: string;
  flex?: string;   //
  flexBasis?: string;
  overflow?: string;   //
}

export const Box = styled.div<BoxProps>`
  ${commonStyles}
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  display: ${({ display }) => display || 'block'};
  flex-direction: ${({ direction }) => direction || undefined};
  flex-grow: ${({ grow }) => grow || undefined};
  flex-basis: ${({ basis }) => basis || undefined};
  flex-wrap: ${({ wrap }) => wrap && "wrap" || undefined};
  justify-content: ${({ justifyContent }) => justifyContent || undefined};
  align-items: ${({ alignItems }) => alignItems || undefined};
  gap: ${({ gap }) => gap || undefined};
  border: ${({ border }) => border || undefined};
  border-top: ${({ borderTop }) => borderTop || undefined};
  border-right: ${({ borderRight }) => borderRight || undefined};
  border-bottom: ${({ borderBottom }) => borderBottom || undefined};
  border-left: ${({ borderLeft }) => borderLeft || undefined};
  border-radius: ${({ borderRadius }) => borderRadius || undefined};

  max-width: ${({ maxWidth }) => maxWidth || undefined};
  max-height: ${({ maxHeight }) => maxHeight || undefined};
  text-align: ${({ textAlign }) => textAlign || 'left'};
  background: ${({ background }) => background || undefined};   //
  position: ${({ position }) => position || "static"};
  z-index: ${({ zIndex }) => zIndex || 0};
  height: ${({ height }) => height || undefined};   //
  flex-direction: ${({ flexDirection }) => flexDirection || undefined};
  flex: ${({ flex }) => flex || undefined};                               //
  flex-basis: ${({ flexBasis }) => flexBasis || undefined};
  overflow: ${({ overflow }) => overflow || undefined};     //
`