import styled from 'styled-components';
import { PRIMARY, PRIMARY_2, WHITE } from './../../../shared/styles/variables';
import { commonStyles } from '../../../shared/styles/commonStyles';

export const DateInput = styled.button`
  ${commonStyles}
  padding: 10px 14px;
  background: ${WHITE};
  font-size: 16px;
  font-weight: 500;
  border: 2px solid ${PRIMARY_2};
  border-radius: 12px;

  &:focus {
    border-color: ${PRIMARY};
    outline: none;
  }
`;
