import styled from "styled-components";

import {commonStyles} from "../../../shared/styles/commonStyles";

import COLORS from '../../../shared/styles/variables';

import { FormProps } from "../../../../types/atoms";

export const Form = styled.form<FormProps>`
  ${commonStyles};
  
  max-width: ${({maxWidth}) => maxWidth || undefined};
  text-align: ${({textAlign}) => textAlign || undefined};
  color: ${({color}) => color || COLORS.WHITE};
  align-items: ${({alignItems}) => alignItems || undefined};
`