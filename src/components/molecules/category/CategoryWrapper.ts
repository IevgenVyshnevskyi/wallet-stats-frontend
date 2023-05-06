import styled from "styled-components";
import { Box } from "../../atoms/box/Box.styled";
import { PRIMARY_HOVER, WHITE } from "../../../shared/styles/variables";

export const CategoryWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 8px;
  padding: 16px;
  width: 100%;

  &:hover {
    background-color: ${PRIMARY_HOVER};

    div > h5 {
      color: ${WHITE};
    }
  }
`;
