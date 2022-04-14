import styled from 'styled-components'
import media from 'styled-media-query'
import { Wrapper as ButtonWrapper } from 'components/button/styles'

export const FormContainer = styled.div`
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: calc(1.6rem / 2);
  padding-right: calc(1.6rem / 2);
  background-color: #3E77B6;
  padding: 2rem 2rem;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 40rem;
  align-items: center;
  justify-content: center;
  background-color: #ECECEC;
  padding: 2rem 1.6rem;
  border-radius: 0.8rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.10);

  ${ButtonWrapper} {
    margin-top: 1.2rem;
    margin-bottom: 0.8rem;
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.8rem;
  align-items: center;
  justify-content: center;

  ${media.greaterThan('medium')`
    grid-template-columns: repeat(2, 1fr);
  `}

  ${media.greaterThan('large')`
    grid-template-columns: repeat(3, 1fr);
  `}
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;
`

export const Label = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
`

export const Heading = styled.h2`
  font-size: 2rem;
  color: black;
`

export const ErrorMessage = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #FF0000;
`