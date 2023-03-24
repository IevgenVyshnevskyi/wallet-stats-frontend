import styled from "styled-components";
import '../../../shared/styles/variables.ts'

type ContainerProps = {
  maxWidth?: string;
}

export const Container = styled.div<ContainerProps>`
  max-width: ${({ maxWidth }) => maxWidth};
  margin: 0 auto;
`