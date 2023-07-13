import styled from "styled-components";

import commonStyles from "../../../shared/styles/commonStyles";

const ButtonTransparent = styled.button`
  ${commonStyles}
  margin: 0;
  padding: 0;
  border: none;
  cursor: pointer;
  background: transparent;
  display: flex;
`;

export default ButtonTransparent;
