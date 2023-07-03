import styled from 'styled-components'

import { blackSVGtoWhite } from '../../../shared/styles/iconStyles'

import { Box } from '../../atoms/box/Box.styled'

import COLORS from '../../../shared/styles/variables'

export const PopupWrapper = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.GREY_50}66;

  >${Box} {
    display: flex;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    padding: 32px;
    border-radius: 16px;
    background: ${COLORS.BASE_1};
    position: relative;
  
    > button {
      top: 15px;
      right: 15px;
      position: absolute;
      padding: 12px 20px;

      &:hover {
        background-color: ${COLORS.PRIMARY};
        border-color: ${COLORS.PRIMARY};

        svg {
          ${blackSVGtoWhite}
        }
      }
    }
  }
`