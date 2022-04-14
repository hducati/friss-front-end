import styled, { css } from 'styled-components'

type WrapperProps = { error?: boolean }

const wrapperModifiers = {
  error: () => css`
    ${InputWrapper} {
      border-color: #FF6347;
    }

    ${Label} {
      color: #FF6347;
    }
  `
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ error }) => css`
    ${error && wrapperModifiers.error()}
  `}
`

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #FFFFFF;
  border-radius: 0.2rem;
  border: 0.2rem solid;
  border-color: #FFFFFF;
  padding: 0 10p;

  &:focus-within {
    box-shadow: 0 0 0.5rem #3CD3C1;
  }
`
export const Input = styled.input`
  color: #030517;
  font-size: 16px;
  padding: 10px 0;
  background: transparent;
  border: 0;
  outline: none;
  width: 100%;
`

export const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #030517;
`

export const Error = styled.p`
  color: #FF6347;
  font-size: 14px;
`
