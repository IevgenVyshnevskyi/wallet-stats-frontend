import styled from 'styled-components';
import { PRIMARY, PRIMARY_2, ALMOST_BLACK_FOR_TEXT } from './../../../shared/styles/variables';

export const Input = styled.input`
  color: ${ALMOST_BLACK_FOR_TEXT};
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  font-weight: 400;
  font-size: 16px;
  border: 2px solid ${PRIMARY_2};
  padding-right: 50px;

  &:focus {
    border-color: ${PRIMARY};
    outline: none;
  }
`;
