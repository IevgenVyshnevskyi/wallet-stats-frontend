import styled from "styled-components";
import { Box } from "../../atoms/box/Box.styled";
import { PRIMARY_HOVER, WHITE } from "../../../shared/styles/variables";

export const CategoryWrapper = styled(Box)`
  display: flex;
  gap: 5px;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 8px;

  &:hover {
    background-color: ${PRIMARY_HOVER};

    div > h5 {
      color: ${WHITE};
    }
  }
`;
