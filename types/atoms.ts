import { commonStylesProps } from "../src/shared/styles/commonStyles";

export type BoxProps = commonStylesProps & {
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

export type ButtonProps = commonStylesProps & {
  primary?: boolean
  secondary?: boolean
  disabled?: boolean
}

export type FormProps = {
  maxWidth?: string;
  textAlign?: string;
  color?: string;
  alignItems?: string;
}

export type LinkProps = {
  fw?: string;
  fz?: string;
  padding?: string;
  borderRadius?: string;
  border?: string;
  cursor?: string;
  background?: string;
  color?: string;
  textDecor?: string;
  lh?: string;
  width?: string;
  height?: string;
  mb?: string;
  m?: string;
  outline?: string;
}

export type ContainerProps = {
  display?: string;
}

export type ImgProps = {
  maxWidth?: string;
  maxHeight?: string;
  position?: string;
  zIndex?: string;
  top?: string;
  left?: string;
  m?: string;
  p?: string;
  display?: string;
}

export type TypographyProps = commonStylesProps & {
  textAlign?: string;
  letterSpacing?: string;
  lh?: string;
}

export interface IOption {
  value: string;
  label: string;
}