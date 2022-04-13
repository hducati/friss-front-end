import { Container } from "components/container/container"
import { FormFormula } from "./components/form-formula/form-formula"
import * as S from './styles'

export const CreateFormulaScreen = () => {
  return (
    <Container>
      <S.Wrapper>
        <S.Heading>Create Formula</S.Heading>
        <FormFormula />
      </S.Wrapper>
    </Container>
  )
}