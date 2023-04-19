import styled from "styled-components";
import { commonStyles } from "../../../shared/styles/commonStyles";
import { BoxProps } from "../../../../types/atoms";

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
  background: ${({ background }) => background || undefined};   //
  position: ${({ position }) => position || "static"};
  z-index: ${({ zIndex }) => zIndex || 0};
  height: ${({ height }) => height || undefined};   //
  flex-direction: ${({ flexDirection }) => flexDirection || undefined};
  flex: ${({ flex }) => flex || undefined};                               //
  flex-basis: ${({ flexBasis }) => flexBasis || undefined};
`