import styled from "styled-components";

import { Box } from "../../../atoms/box/Box.styled";
import { List } from "../../../atoms/list/List.styled";
import { ListItem } from "../../../atoms/list/ListItem.styled";
import { ButtonTransparent } from "../../../atoms/button/ButtonTransparent.styled";
import { tabWrapperStyles } from "../tabWrapperStyles";

import COLORS from "../../../../shared/styles/variables";

export const TabSwitchWrapper = styled(Box)`
  ${tabWrapperStyles}
  width: 215px;

  ${List} {
    display: flex;
    justify-content: center;
    gap: 4px;
    padding: 4px;

    ${ListItem} {
      display: flex;
      align-items: center;
      border-radius: 16px;

      > ${ButtonTransparent} {
        line-height: 15px;
        color: ${COLORS.ALMOST_BLACK_FOR_TEXT};
        text-decoration: none;
        font-size: 13px;
        padding: 8px 16px;
        border-radius: 16px;

        &:hover {
          background-color: ${COLORS.BASE_1};
        }
      }
    }
  } 
`