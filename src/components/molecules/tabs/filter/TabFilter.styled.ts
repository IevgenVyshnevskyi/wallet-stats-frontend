import styled from "styled-components";

import Box from "../../../atoms/box/Box.styled";
import List from "../../../atoms/list/List.styled";
import ListItem from "../../../atoms/list/ListItem.styled";
import Link from "../../../atoms/link/Link.styled";

import tabWrapperStyles from "../tabWrapperStyles";

import COLORS from "../../../../shared/styles/variables";

const TabFilterWrapper = styled(Box)`
  ${tabWrapperStyles}

  ${List} {
    display: flex;
    gap: 4px;
    padding: 4px;

    ${ListItem} {
      display: flex;
      align-items: center;
      border-radius: 16px;

      > ${Link} {
        line-height: 15px;
        color: ${COLORS.ALMOST_BLACK_FOR_TEXT};
        text-decoration: none;
        font-size: 13px;
        padding: 8px 16px;

        &:hover {
          background-color: ${COLORS.BASE_1};
        }
      }
    }
  }
`;

export default TabFilterWrapper;
