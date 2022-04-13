import { FormEvent, useState } from "react"
import Select from 'react-select';
import { useHistory } from "react-router-dom";

import { InputField } from "components/input-field/input-field"
import { yearComparisonType } from "constants/year-comparison-type"
import { fuelType } from "constants/fuel-type";
import { riskType } from "constants/risk";
import { useFormula } from "hooks/use-formula/use-formula";
import { Button } from "components/button/button";
import * as S from './styles'

export const FormFormula = () => {
  const history = useHistory()
  const { createFormula } = useFormula();
  const [yearComparison, setYearComparison] = useState(yearComparisonType[1]);
  const [makeName, setMakeName] = useState("")
  const [modelName, setModelName] = useState("")
  const [year, setYear] = useState(0)
  const [risk, setRisk] = useState(riskType[0])
  const [fuel, setFuel] = useState(fuelType[1])
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!risk) return setErrorMessage("Risk is mandatory!")
    if (!makeName || !modelName || !year || !fuel) {
      return setErrorMessage("At least one parameter must be selected (make, model, year, fuel).")
    }

    await createFormula({ 
      makeName,
      modelName,
      year,
      yearComparisonType: yearComparison['value'].toString(),
      fuelType: fuel['value'].toString(),
      risk: risk['value'].toString(),
    })

    history.push('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <S.Wrapper>
        <S.Grid>
          <InputField
            type="text"
            name="Make name"
            placeholder="Make name"
            value={makeName}
            onChange={event => setMakeName(event.target.value)}
          />
          <InputField
            type="text"
            name="Model name"
            placeholder="Model name"
            value={modelName}
            onChange={event => setModelName(event.target.value)}
          />
          <Select
            value={yearComparison}
            options={yearComparisonType}
            onChange={option => setYearComparison(option!)}
            placeholder="Select an option" 
          />
          <InputField
            type="number"
            name="Year"
            placeholder="Year"
            value={year}
            onChange={event => setYear(Number(event.target.value))}
          />
          <Select
            value={fuel}
            options={fuelType}
            onChange={option => setFuel(option!)}
            placeholder="Select an option" 
          />
          <Select
            value={risk}
            options={riskType}
            onChange={option => setRisk(option!)}
            placeholder="Select an option" 
          />
        </S.Grid>
        <Button fullWidth>Submit</Button>
      </S.Wrapper>
      {!!errorMessage && <span>{errorMessage}</span>}
    </form>
  )
}