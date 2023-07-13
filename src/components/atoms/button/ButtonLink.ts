import styled from "styled-components";

import { ButtonTransparent } from "./ButtonTransparent.styled";

import COLORS from "../../../shared/styles/variables";

export const ButtonLink = styled(ButtonTransparent)`
  color: ${(props) => props.color || COLORS.PRIMARY};
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
