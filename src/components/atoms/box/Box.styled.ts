import styled from "styled-components";

import { commonStyles, commonStylesProps } from "../../../shared/styles/commonStyles";

type BoxProps = commonStylesProps & {
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderLeft?: string;
  borderBottom?: string;
  borderRadius?: string;

  maxWidth?: string;
  maxHeight?: string;
  textAlign?: string;
  background?: string;
  position?: string;
  zIndex?: string;
  height?: string;
  flexDirection?: string;
  flex?: string;
  flexBasis?: string;
  overflow?: string;
}

export const Box = styled.div<BoxProps>`
  ${commonStyles};
  border: ${({ border }) => border || undefined};
  border-top: ${({ borderTop }) => borderTop || undefined};
  border-right: ${({ borderRight }) => borderRight || undefined};
  border-bottom: ${({ borderBottom }) => borderBottom || undefined};
  border-left: ${({ borderLeft }) => borderLeft || undefined};

  max-width: ${({ maxWidth }) => maxWidth || undefined};
  max-height: ${({ maxHeight }) => maxHeight || undefined};
  text-align: ${({ textAlign }) => textAlign || 'left'};
  background: ${({ background }) => background || undefined};
  position: ${({ position }) => position || "static"};
  z-index: ${({ zIndex }) => zIndex || 0};
  height: ${({ height }) => height || undefined};
  flex-direction: ${({ flexDirection }) => flexDirection || undefined};
  flex: ${({ flex }) => flex || undefined};
  flex-basis: ${({ flexBasis }) => flexBasis || undefined};
`