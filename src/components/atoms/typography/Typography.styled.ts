import styled, { css } from 'styled-components';
import { commonStyles, commonStylesProps } from '../../../shared/styles/commonStyles';

type TypographyProps = commonStylesProps & {
  fz?: string;
  fw?: string;
  textAlign?: string;
  letterSpacing?: string;
  lh?: string;
}

export const Typography = styled.p<TypographyProps>(props => {
  const {
    fz, fw,
    textAlign,
    letterSpacing,
    lh
  } = props

  return css`
    ${commonStyles}
    font-size: ${fz || '14px'};
    font-weight: ${fw || '400'};
    text-align: ${textAlign || 'left'};
    letter-spacing: ${letterSpacing || 'normal'};
    line-height: ${lh || undefined};
  `
})