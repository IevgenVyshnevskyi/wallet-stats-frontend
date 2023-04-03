import styled from "styled-components";
import { ImgProps } from "../../../../types/atoms";

export const Img = styled.img<ImgProps>`
  max-width: ${({maxWidth}) => maxWidth || undefined};
  max-height: ${({maxHeight}) => maxHeight || undefined};
  position: ${({position}) => position || undefined};
  z-index: ${({zIndex}) => zIndex || 0};
  top: ${({top}) => top || undefined};
  left: ${({left}) => left || undefined};
  margin: ${({m}) => m || '0px 0px 0px 0px'};
  padding: ${({p}) => p || '0px 0px 0px 0px'};
  display: ${({display}) => display || undefined};
`