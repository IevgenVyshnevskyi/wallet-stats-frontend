import styled from "styled-components";
import { Box } from "../../atoms/box/Box.styled";
import { PRIMARY_HOVER, WHITE } from "../../../shared/styles/variables";

type TransactionWrapperProps = {
  isTransactionsPage: boolean;
}

export const TransactionWrapper = styled(Box)<TransactionWrapperProps>`
  display: flex;
  gap: 5px;
  border-radius: 8px;
  padding: 17px;

  ${({ isTransactionsPage }) => isTransactionsPage && `
    &:hover {
      background-color: ${PRIMARY_HOVER};

      *:not(div:nth-child(2) > div > span) {
        color: ${WHITE};
      }
    }
  `}
`;
