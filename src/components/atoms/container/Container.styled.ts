import styled from "styled-components";
import { ContainerProps } from "../../../../types/atoms";

export const Container = styled.div<ContainerProps>`
  display: ${({ display }) => display || undefined};
  overflow-x: ${({ overflowX }) => overflowX || undefined};
`