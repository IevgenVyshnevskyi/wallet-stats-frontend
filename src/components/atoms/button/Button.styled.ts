import styled, { css } from "styled-components"

import { commonStyles } from "../../../shared/styles/commonStyles"

import COLORS from "../../../shared/styles/variables"

import { ButtonProps } from "../../../../types/atoms"

export const buttonStyles = css<ButtonProps>`
  ${({ primary, secondary, disabled }) => `
    font-weight: 600;
    font-size: 16px;
    padding: 10px 32px;
    border-radius: 12px;
    cursor: pointer;

    ${primary ? `
      color: ${COLORS.WHITE};
      background-color: ${COLORS.PRIMARY};
      border: none;
      &:hover {
        background-color: ${COLORS.PRIMARY_HOVER};
      }
    ` : secondary ? `
      border: 2px solid ${COLORS.PRIMARY};
      background-color: ${COLORS.WHITE};
      &:hover {
        border-color: ${COLORS.PRIMARY_HOVER};
      }
    ` : undefined
    }

    ${disabled ? `
      cursor: not-allowed;
      pointer-events: none;
    ` + (primary ? `
      background-color: ${COLORS.DISABLED};
    ` : `
      border-color: ${COLORS.DISABLED};
      color: ${COLORS.DISABLED};
    ` ) : undefined
    }
  `}
`

export const Button = styled.button<ButtonProps>`
  ${commonStyles}
  ${buttonStyles}
`