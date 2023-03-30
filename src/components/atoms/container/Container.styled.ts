import styled from "styled-components";

import {WHITE} from "../../../shared/styles/variables";

type ContainerProps = {
     display?: string;
}

export const Container = styled.div<ContainerProps>`
  display: ${({display}) => display || undefined};
`