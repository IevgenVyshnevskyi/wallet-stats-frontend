import { Link as RouterLink } from "react-router-dom";

import styled from "styled-components";

import { blackSVGtoWhite } from "../../../shared/styles/iconStyles";

import COLORS from "../../../shared/styles/variables";

export const LinkMenu = styled(RouterLink)`
  padding: 10px 28px;
  border-radius: 40px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  ${({ to }) =>
    to === window.location.pathname
      ? `
    background-color: ${COLORS.PRIMARY};
    > span {
      color: ${COLORS.WHITE};
    }

    svg {
      ${blackSVGtoWhite};
    }
  `
      : undefined}

  &:hover {
    background-color: ${COLORS.PRIMARY_HOVER};

    svg {
      ${blackSVGtoWhite}
    }

    > span {
      color: ${COLORS.WHITE};
    }
  }

  > svg {
    padding-right: 10px;
  }

  > span {
    font-size: 14px;
    font-weight: 600;
  }
`;
