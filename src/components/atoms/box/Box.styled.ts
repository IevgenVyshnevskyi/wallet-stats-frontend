import styled from "styled-components";
import '../../../shared/styles/variables.ts'

type BoxProps = {
  m?: string;
  p?: string;
  width?: string;
  height?: string;
  color?: string;
  bgColor?: string;
  display?: string;
  direction?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
}

export const Box = styled.div<BoxProps>`
  margin: ${({ m }) => m || 0};
  padding: ${({ p }) => p || 0};
  width: ${({ width }) => width || undefined};
  height: ${({ height }) => height || undefined};
  color: ${({ color }) => color || "inherit"};
  background-color: ${({ bgColor }) => bgColor || "var(--grey)"};
  display: ${({ display }) => display || 'block'};
  flex-direction: ${({ direction }) => direction || undefined};
  justify-content: ${({ justifyContent }) => justifyContent || undefined};
  align-items: ${({ alignItems }) => alignItems || undefined};
  gap: ${({ gap }) => gap || undefined};
`