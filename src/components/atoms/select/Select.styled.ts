import styled from "styled-components";
import { commonStyles } from "../../../shared/styles/commonStyles";
import { PRIMARY_2, WHITE } from "../../../shared/styles/variables";

export const Select = styled.select`
  ${commonStyles}
  padding: 10px 14px;
  background: ${WHITE};
  font-size: 16px;
  border: 2px solid ${PRIMARY_2};
  outline: none;
  border-radius: 12px;
`