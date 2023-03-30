import styled, { css } from 'styled-components';

type TypographyProps = {
  m?: string;
  p?: string;
  color?: string;
  fz?: string;
  fw?: string;
  textAlign?: string;
  letterSpacing?: string;
  lh?: string;
}

export const Typography = styled.p<TypographyProps>(props => {
  const {
    m, p,
    fz, fw,
    color,
    textAlign,
    letterSpacing,
      lh
  } = props

  return css`
    margin: ${m || 0};
    padding: ${p || 0};
    font-size: ${fz || '14px'};
    font-weight: ${fw || '400'};
    color: ${color || 'inherit'};
    text-align: ${textAlign || 'left'};
    letter-spacing: ${letterSpacing || 'normal'};
    line-height: ${lh || 0};
  `
})