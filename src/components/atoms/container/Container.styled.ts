import styled from "styled-components";

type ContainerProps = {
  display?: string;
  overflowX?: string;
}

export const Container = styled.div<ContainerProps>`
  display: ${({ display }) => display || undefined};
  overflow-x: ${({ overflowX }) => overflowX || undefined};
`