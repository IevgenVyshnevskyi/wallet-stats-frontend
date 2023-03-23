import styled from "styled-components";
import '../../../shared/styles/variables.css'

type ContainerProps = {
  maxWidth?: string;
}

export const Container = styled.div<ContainerProps>`
  max-width: ${({ maxWidth }) => maxWidth};
  margin: 0 auto;
`