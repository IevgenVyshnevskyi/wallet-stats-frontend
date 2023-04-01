import styled from "styled-components";

export const InputPasswordWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 70px;

  > input {
    font-size: 16px;
    padding-right: 50px;
  }

  > svg {
    position: absolute;
    top: 16px;
    right: -50px;
    cursor: pointer;
  }
`