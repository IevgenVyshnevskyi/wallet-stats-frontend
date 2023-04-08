import styled from "styled-components";
import { Link as RouterLink } from 'react-router-dom';
import { LinkProps } from "../../../../types/atoms";

export const Link = styled(RouterLink) <LinkProps>`
  font-weight: ${({ fw }) => fw || "700px"};
  font-size: ${({ fz }) => fz || "18px"};
  padding: ${({ padding }) => padding || "13px 48px"};
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
`