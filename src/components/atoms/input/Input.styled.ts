import styled from "styled-components";

import commonStyles from "../../../shared/styles/commonStyles";

import COLORS from "../../../shared/styles/variables";

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  ${commonStyles}
  border-radius: 10px;
  font-weight: 400;
  font-size: 16px;
  border: 2px solid ${COLORS.PRIMARY_2};

  &:focus {
    border-color: ${COLORS.PRIMARY};
    outline: none;
  }

  &.error {
    border: 2px solid ${COLORS.ALERT_1};
    background-color: ${COLORS.ALERT_2};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default Input;
