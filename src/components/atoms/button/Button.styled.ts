import styled, { css } from "styled-components"
import { DISABLED, PRIMARY, PRIMARY_HOVER, WHITE } from "./../../../shared/styles/variables"
import { commonStyles, commonStylesProps } from "../../../shared/styles/commonStyles"

export type ButtonProps = commonStylesProps & {
  primary?: boolean
  secondary?: boolean
  disabled?: boolean
}

export const buttonStyles = css<ButtonProps>`
  ${({ primary, secondary, disabled }) => `
    font-weight: 600;
    font-size: 16px;
    padding: 10px 32px;
    border-radius: 12px;
    cursor: pointer;

    ${primary ? `
      color: ${WHITE};
      background-color: ${PRIMARY};
      border: none;
      &:hover {
        background-color: ${PRIMARY_HOVER};
      }
    ` : secondary ? `
      border: 2px solid ${PRIMARY};
      background-color: ${WHITE};
      &:hover {
        border-color: ${PRIMARY_HOVER};
      }
    ` : undefined
    }

    ${disabled ? `
      cursor: not-allowed;
      pointer-events: none;
    ` + (primary ? `
      background-color: ${DISABLED};
    ` : `
      border-color: ${DISABLED};
      color: ${DISABLED};
    ` ) : undefined
    }
  `}
`

export const Button = styled.button<ButtonProps>`
  ${commonStyles}
  ${buttonStyles}
`