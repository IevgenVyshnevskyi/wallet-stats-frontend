import styled, { css } from "styled-components"
import { ALMOST_BLACK_FOR_TEXT, DISABLED, PRIMARY, PRIMARY_HOVER, WHITE } from "./../../../shared/styles/variables"

type ButtonProps = {
  primary?: boolean
  secondary?: boolean
  disabled?: boolean
}

export const Button = styled.button<ButtonProps>((props) => {
  const { primary, secondary, disabled } = props

  return css`
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
      color: ${ALMOST_BLACK_FOR_TEXT};
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
  `
})