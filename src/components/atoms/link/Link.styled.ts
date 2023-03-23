import styled from "styled-components";
import { Link as RouterLink } from 'react-router-dom';

export const Link = styled(RouterLink)`
  font-weight: 700;
  font-size: 18px;
  padding: 13px 48px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  background: var(--almost-black);
  color: var(--white);
  text-decoration: none;
`