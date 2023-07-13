import { Link as RouterLink } from "react-router-dom";

import styled from "styled-components";

type LinkProps = {
  fw?: string;
  fz?: string;
  padding?: string;
  borderRadius?: string;
  border?: string;
  cursor?: string;
  background?: string;
  color?: string;
  textDecor?: string;
  lh?: string;
  width?: string;
  height?: string;
  mb?: string;
  m?: string;
  outline?: string;
};

export const Link = styled(RouterLink)<LinkProps>`
  font-weight: ${({ fw }) => fw || "700px"};
  font-size: ${({ fz }) => fz || "18px"};
  border-radius: ${({ borderRadius }) => borderRadius || "16px"};
  border: ${({ border }) => border || "none"};
  cursor: ${({ cursor }) => cursor || "pointer"};
  background: ${({ background }) => background || undefined};
  color: ${({ color }) => color || undefined};
  text-decoration: ${({ textDecor }) => textDecor || "none"};
  line-height: ${({ lh }) => lh || undefined};
  width: ${({ width }) => width || undefined};
  height: ${({ height }) => height || undefined};
  margin-bottom: ${({ mb }) => mb || undefined};
  margin: ${({ m }) => m || undefined};
  outline: ${({ outline }) => outline || undefined};

  &:hover {
    text-decoration: underline;
  }
`;
