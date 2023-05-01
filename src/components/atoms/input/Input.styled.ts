import styled from 'styled-components';
import { ALERT_1, ALERT_2, PRIMARY, PRIMARY_2 } from './../../../shared/styles/variables';
import { commonStyles } from '../../../shared/styles/commonStyles';

export const Input = styled.input`
  width: 100%;
  ${commonStyles};
  padding: 12px 16px;
  border-radius: 10px;
  font-weight: 400;
  font-size: 16px;
  border: 2px solid ${PRIMARY_2};

  &:focus {
    border-color: ${PRIMARY};
    outline: none;
  }
  
  &.error {
    border: 2px solid ${ALERT_1};
    background-color: ${ALERT_2};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
