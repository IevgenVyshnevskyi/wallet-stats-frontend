import styled from 'styled-components';
import { ButtonTransparent } from './ButtonTransparent.styled';
import { PRIMARY } from '../../../shared/styles/variables';

export const ButtonLink = styled(ButtonTransparent)`
  color: ${PRIMARY};
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`