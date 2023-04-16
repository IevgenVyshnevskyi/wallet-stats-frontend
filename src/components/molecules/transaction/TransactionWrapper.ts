import styled from "styled-components";
import { Box } from "../../atoms/box/Box.styled";
import { PRIMARY_HOVER, WHITE } from "../../../shared/styles/variables";

export const TransactionWrapper = styled(Box)`
  display: flex;
  gap: 5px;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 8px;

  ${window.location.pathname === '/transactions' && `
    &:hover {
      background-color: ${PRIMARY_HOVER};

      *:not(div:nth-child(2) > div > span) {
        color: ${WHITE};
      }
    }
  `}
`