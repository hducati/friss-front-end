import { Button } from "components/button/button";
import { Formula } from "hooks/use-formula/types";
import { useFormula } from "hooks/use-formula/use-formula";
import { MdDelete } from 'react-icons/md'
import * as S from './styles';

export interface FormulaListProps {
  formulas: Formula[];
}

export const FormulaList = ({ formulas }: FormulaListProps) => {
  const { deleteFormula } = useFormula();

  const onRemove = (id: string) => {
    deleteFormula(id)
  }

  return (
    <S.Table>
      <thead>
        <S.TableHeaderRow>
          <S.TableHeading>ID</S.TableHeading>
          <S.TableHeading>Make name</S.TableHeading>
          <S.TableHeading>Model name</S.TableHeading>
          <S.TableHeading>Risk</S.TableHeading>
          <S.TableHeading>Year</S.TableHeading>
          <S.TableHeading>Year Comparison</S.TableHeading>
          <S.TableHeading>Fuel</S.TableHeading>
          <S.TableHeading>Options</S.TableHeading>
        </S.TableHeaderRow>
      </thead>
      <tbody>
        {!formulas && <span>No data available</span>}
        {formulas.map((formula) => (
          <S.TableContentRow key={formula.id}>
            <S.TableField>{formula.id}</S.TableField>
            <S.TableField>{formula.makeName}</S.TableField>
            <S.TableField>{formula.modelName}</S.TableField>
            <S.TableField>{formula.risk}</S.TableField>
            <S.TableField>{formula.year}</S.TableField>
            <S.TableField>{formula.yearComparisonType}</S.TableField>
            <S.TableField>{formula.fuelType}</S.TableField>
            <S.TableField>
              <Button onClick={() => onRemove(formula.id)} icon={<MdDelete />} />
            </S.TableField>
          </S.TableContentRow>
        ))}
      </tbody>
    </S.Table>
  )
}