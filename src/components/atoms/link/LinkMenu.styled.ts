import styled from "styled-components"
import { PRIMARY, WHITE } from "../../../shared/styles/variables"
import { Link as RouterLink } from 'react-router-dom';
import { blackSVGtoWhite } from "../../../shared/styles/iconStyles";

export const LinkMenu = styled(RouterLink)`
  padding: 10px 28px;
  border-radius: 40px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  ${({ to }) => (to === window.location.pathname ? `
    background-color: ${PRIMARY};
    > span {
      color: ${WHITE};
    }

    svg {
      ${blackSVGtoWhite};
    }
  ` : undefined
  )}

  &:hover {
    background-color: ${PRIMARY};

    svg {
      ${blackSVGtoWhite}
    }

    > span {
      color: ${WHITE};
    }
  }

  > svg {
    padding-right: 10px;
  }

  > span {
    font-size: 14px;
    font-weight: 600;
  }
`