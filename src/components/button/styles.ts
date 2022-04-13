import styled, { css } from 'styled-components'
import { WrapperProps } from './types'

const wrapperModifiers = {
  small: () => css`
    height: 2rem;
    font-size: 1.2rem;
  `,

  medium: () => css`
    height: 3rem;
    font-size:1.4rem;
    padding: 0.6rem 0.8rem;
  `,

  large: () => css`
    height: 5rem;
    font-size: 1.6rem;
    padding: 0.8rem 1.2rem;
  `,

  withIcon: () => css`
    svg {
      width: 1.5rem;

      & + span {
        margin-left: 0.8rem;
      }
    }
  `,

  fullWidth: () => css`
    width: 100%;
  `,
}

export const Wrapper = styled.button<WrapperProps>`
  ${({ size, fullWidth, hasIcon }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #3D3AEF 0%, #4E97D1 50%);
    color: #fafafa;
    border: 0;
    cursor: pointer;
    border-radius: 0.4rem;
    padding: 0.8rem;
    text-decoration: none;

    &:hover {
      background: linear-gradient(180deg, #003777 0%, #3E77B6 50%);
    }

    ${!!size && wrapperModifiers[size]()}
    ${!!hasIcon && wrapperModifiers.withIcon()}
    ${!!fullWidth && wrapperModifiers.fullWidth()}
  `}
`
