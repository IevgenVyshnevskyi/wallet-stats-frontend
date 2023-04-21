import styled from 'styled-components';

import {ALMOST_BLACK_FOR_TEXT, DIVIDER, BASE_1} from '../../../shared/styles/variables';

export const ButtonPopup = styled.button`
  color: ${props => props.color || ALMOST_BLACK_FOR_TEXT};
  font-weight: 400;
  font-size: 12px;
  width: 188px;
  height: 37px;
  text-align: center;
  background: ${BASE_1};
  border: none;
  border-bottom: 2px solid ${DIVIDER};
`