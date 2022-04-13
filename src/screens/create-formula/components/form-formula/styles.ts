import styled from 'styled-components'
import media from 'styled-media-query'
import { Wrapper as ButtonWrapper } from 'components/button/styles'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 40rem;
  align-items: center;
  justify-content: center;

  ${ButtonWrapper} {
    margin-top: 1rem;
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