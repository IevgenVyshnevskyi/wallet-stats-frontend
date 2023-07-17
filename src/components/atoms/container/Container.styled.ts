import styled from "styled-components";

type ContainerProps = {
  display?: string;
  overflowX?: string;
};

const Container = styled.div<ContainerProps>`
  display: ${({ display }) => display || undefined};
  overflow-x: ${({ overflowX }) => overflowX || undefined};
`;

export default Container;
