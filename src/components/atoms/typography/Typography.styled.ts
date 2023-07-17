import styled, { css } from "styled-components";

import commonStyles, {
  commonStylesProps,
} from "../../../shared/styles/commonStyles";

type TypographyProps = commonStylesProps & {
  textAlign?: string;
  letterSpacing?: string;
  lh?: string;
};

const Typography = styled.p<TypographyProps>((props) => {
  const { textAlign, letterSpacing, lh } = props;

  return css`
    ${commonStyles}
    text-align: ${textAlign || "left"};
    letter-spacing: ${letterSpacing || "normal"};
    line-height: ${lh || undefined};
  `;
});

export default Typography;
