import styled from 'styled-components';

import { commonStyles } from '../../../shared/styles/commonStyles';

import COLORS from '../../../shared/styles/variables';

export const DateInput = styled.button`
  ${commonStyles}
  padding: 10px 14px;
  background: ${COLORS.WHITE};
  font-size: 16px;
  font-weight: 500;
  border: 2px solid ${COLORS.PRIMARY_2};
  border-radius: 12px;

  &:focus {
    border-color: ${COLORS.PRIMARY};
    outline: none;
  }
`;
