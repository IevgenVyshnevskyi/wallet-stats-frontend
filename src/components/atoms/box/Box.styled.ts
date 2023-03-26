import styled from "styled-components";
import '../../../shared/styles/variables.ts'

type BoxProps = {
  m?: string;
  p?: string;
  width?: string;
  color?: string;
  bgColor?: string;
  display?: string;
  direction?: string;
  grow?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderLeft?: string;
  borderBottom?: string;
  borderRadius?: string;
}

export const Box = styled.div<BoxProps>`
  margin: ${({ m }) => m || 0};
  padding: ${({ p }) => p || 0};
  width: ${({ width }) => width || undefined};
  color: ${({ color }) => color || "inherit"};
  background-color: ${({ bgColor }) => bgColor || "var(--grey)"};
  display: ${({ display }) => display || 'block'};
  flex-direction: ${({ direction }) => direction || undefined};
  flex-grow: ${({ grow }) => grow || undefined};
  justify-content: ${({ justifyContent }) => justifyContent || undefined};
  align-items: ${({ alignItems }) => alignItems || undefined};
  gap: ${({ gap }) => gap || undefined};
  border: ${({ border }) => border || undefined};
  border-top: ${({ borderTop }) => borderTop || undefined};
  border-right: ${({ borderRight }) => borderRight || undefined};
  border-bottom: ${({ borderBottom }) => borderBottom || undefined};
  border-left: ${({ borderLeft }) => borderLeft || undefined};
  border-radius: ${({ borderRadius }) => borderRadius || undefined};
`