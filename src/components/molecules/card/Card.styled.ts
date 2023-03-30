import styled from "styled-components";
import { WHITE, PRIMARY } from "../../../shared/styles/variables";
import { ButtonTransparent } from '../../atoms/button/ButtonTransparent.styled';
import { blackSVGtoWhite } from "../../../shared/styles/iconStyles";

export const CardButton = styled(ButtonTransparent)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  padding: 20px 15px;
  background: ${WHITE};
  border-radius: 8px;
  margin-bottom: 8px;

  &:hover {
    background-color: ${PRIMARY};

    * {
      color: ${WHITE};
    }

    svg {
      opacity: 1;
      ${blackSVGtoWhite}
    }
  }
`
