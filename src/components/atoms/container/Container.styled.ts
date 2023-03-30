import styled from "styled-components";

type ContainerProps = {
  display?: string;
}

export const Container = styled.div<ContainerProps>`
  display: ${({ display }) => display || undefined};
`