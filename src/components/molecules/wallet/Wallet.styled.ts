import styled from "styled-components";

import { blackSVGtoWhite } from "../../../shared/styles/iconStyles";
import { commonStyles } from "../../../shared/styles/commonStyles";

import { ButtonTransparent } from "../../atoms/button/ButtonTransparent.styled";

import COLORS from "../../../shared/styles/variables";

type WalletButtonProps = {
  isActive: boolean;
};

const transactionsPath = window.location.pathname === "/transactions";

export const WalletButton = styled(ButtonTransparent)<WalletButtonProps>`
  ${commonStyles}
  background: ${({ isActive }) => (isActive ? COLORS.PRIMARY : COLORS.WHITE)};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  padding: ${transactionsPath ? "15px" : "20px 15px"};
  border-radius: 8px;

  * {
    color: ${({ isActive }) =>
      isActive ? COLORS.WHITE : COLORS.ALMOST_BLACK_FOR_TEXT};
  }

  svg {
    opacity: ${({ isActive }) => isActive && "1"};
    ${({ isActive }) => isActive && blackSVGtoWhite};
  }

  &:hover {
    background-color: ${COLORS.PRIMARY_HOVER};

    * {
      color: ${({ isActive }) => (isActive ? COLORS.WHITE : COLORS.WHITE)};
    }

    svg {
      opacity: 1;
      ${blackSVGtoWhite}
    }
  }
`;
