import styled from 'styled-components';

import COLORS from '../../../shared/styles/variables';

export const ButtonPopup = styled.button`
  color: ${props => props.color || COLORS.ALMOST_BLACK_FOR_TEXT};
  font-weight: 400;
  font-size: 12px;
  width: 188px;
  height: 37px;
  text-align: center;
  background: ${COLORS.BASE_1};
  border: none;
  border-bottom: 2px solid ${COLORS.DIVIDER};
  cursor: pointer;
`