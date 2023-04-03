import styled, { css } from 'styled-components';
import { commonStyles } from '../../../shared/styles/commonStyles';
import { TypographyProps } from '../../../../types/atoms';

export const Typography = styled.p<TypographyProps>(props => {
  const {
    textAlign,
    letterSpacing,
    lh
  } = props

  return css`
    ${commonStyles}
    text-align: ${textAlign || 'left'};
    letter-spacing: ${letterSpacing || 'normal'};
    line-height: ${lh || undefined};
  `
})