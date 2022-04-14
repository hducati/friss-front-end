import { Button } from "components/button/button";
import { Container } from "components/container/container";
import { FormulaList } from "components/formula-list/formula-list"
import { useFormula } from "hooks/use-formula/use-formula";
import { useHistory } from "react-router-dom";
import * as S from './styles'

export const HomeScreen = () => {
  const { formulas, deleteFormula } = useFormula();
  const history = useHistory();

  const onRemove = (id: string) => {
    deleteFormula(id)
  }

  const redirectToCreateNewFormula = () => {
    const path = '/formula'
    history.push(path)
  }

  return (
    <Container>
      <S.Wrapper>
        <S.ButtonWrapper>
        <Button size="small" onClick={redirectToCreateNewFormula}>Create formula</Button>
        </S.ButtonWrapper>
        <FormulaList formulas={formulas} onRemove={onRemove} />
      </S.Wrapper>
    </Container>
  )
}