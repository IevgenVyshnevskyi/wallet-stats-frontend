import styled from "styled-components";
import { WHITE, PRIMARY, PRIMARY_HOVER, ALMOST_BLACK_FOR_TEXT } from "../../../shared/styles/variables";
import { ButtonTransparent } from '../../atoms/button/ButtonTransparent.styled';
import { blackSVGtoWhite } from "../../../shared/styles/iconStyles";
import { commonStyles } from "../../../shared/styles/commonStyles";

type WalletButtonProps = {
  isActive: boolean;
}

const transactionsPath = window.location.pathname === "/transactions";

export const WalletButton = styled(ButtonTransparent) <WalletButtonProps>`
  ${commonStyles}
  background: ${({ isActive }) => isActive ? PRIMARY : WHITE};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  padding: ${transactionsPath ? '15px' : '20px 15px'};
  border-radius: 8px;

  * {
    color: ${({ isActive }) => isActive ? WHITE : ALMOST_BLACK_FOR_TEXT};
  }

  svg {
    opacity: ${({ isActive }) => isActive && '1'};
    ${({ isActive }) => isActive && blackSVGtoWhite};
  }
  
  &:hover {
    background-color: ${PRIMARY_HOVER};

    * {
      color: ${({ isActive }) => isActive ? WHITE : WHITE};
    }

    svg {
      opacity: 1;
      ${blackSVGtoWhite}
    }
  }
`
