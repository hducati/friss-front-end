import { FormEvent, useEffect, useState } from "react"
import Select from 'react-select';
import { useHistory } from "react-router-dom";

import { InputField } from "components/input-field/input-field"
import { yearComparisonType } from "constants/year-comparison-type"
import { fuelType } from "constants/fuel-type";
import { riskType } from "constants/risk";
import { useFormula } from "hooks/use-formula/use-formula";
import { Button } from "components/button/button";
import { getMakesService } from "services/get-makes/get-makes-service";
import { OptionType } from "constants/types/option-type";
import { getModelByMakeName } from "services/get-model-by-make-name/get-model-by-make-name";
import * as S from './styles'

export const CreateFormulaScreen = () => {
  const [makeNameOptions, setMakeNameOptions] = useState<OptionType[]>([])
  const [modelNameOptions, setModelNameOptions] = useState<OptionType[]>([])

  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const initialEntries = {
    makeName: makeNameOptions[0],
    modelName: modelNameOptions[0],
    year: 0,
    yearComparison: yearComparisonType[1],
    risk: riskType[0],
    fuel: fuelType[1]
  }

  const [formula, setFormula] = useState({...initialEntries})

  const history = useHistory()
  const { createFormula } = useFormula();

  useEffect(() => {
    setIsLoading(true)
    async function fetchData() {
      const makeNameResult = await getMakesService()
      const modelNameResult = await getModelByMakeName(makeNameResult[0].value)
      setMakeNameOptions([...makeNameResult])
      setModelNameOptions([...modelNameResult])
      setIsLoading(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      const result = await getModelByMakeName(formula.makeName['value'])
      setModelNameOptions([...result])
    }

    fetchData()
  }, [formula.makeName])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!formula.risk) return setErrorMessage("Risk is mandatory!")
    if (!formula.makeName || !formula.modelName || !formula.year || !formula.fuel) {
      return setErrorMessage("At least one parameter must be selected (make, model, year, fuel).")
    }

    await createFormula({ 
      makeName: formula.makeName['value'].toLowerCase(),
      modelName: formula.modelName['value'].toLowerCase(),
      year: formula.year,
      yearComparisonType: formula.yearComparison['value'],
      fuelType: formula.fuel['value'],
      risk: formula.risk['value'],
    })

    setFormula({...initialEntries})
    setErrorMessage("")

    history.push('/')
  }

  const onMakeNameChange = (option: OptionType | null) => {
    const modelNameEmpty = { value: "", label: "" }
    setFormula({...formula, makeName: option!, modelName: modelNameEmpty})
  }

  return (
    <form onSubmit={handleSubmit}>
        {!isLoading && (
          <S.FormContainer>
            <S.Wrapper>
              <S.Heading>Create Formula</S.Heading>
              <S.Grid>
                <Select
                  value={formula.makeName}
                  options={makeNameOptions}
                  onChange={option => onMakeNameChange(option)}
                  placeholder="Select an option" 
                />
                <Select
                  value={formula.modelName}
                  options={modelNameOptions}
                  onChange={option => setFormula({...formula, modelName: option!})}
                  placeholder="Select an option" 
                />
                <Select
                  value={formula.yearComparison}
                  options={yearComparisonType}
                  onChange={option => setFormula({...formula, yearComparison: option!})}
                  placeholder="Select an option" 
                />
                <InputField
                  type="number"
                  name="Year"
                  placeholder="Year"
                  value={formula.year}
                  onChange={event => setFormula({...formula, year: Number(event.target.value)})}
                />
                <Select
                  value={formula.fuel}
                  options={fuelType}
                  onChange={option => setFormula({...formula, fuel: option!})}
                  placeholder="Select an option" 
                />
                <Select
                  value={formula.risk}
                  options={riskType}
                  onChange={option => setFormula({...formula, risk: option!})}
                  placeholder="Select an option" 
                />
              </S.Grid>
            <Button fullWidth>Submit</Button>
            </S.Wrapper>
          </S.FormContainer>
        )}
       
      {!!errorMessage && <span>{errorMessage}</span>}
    </form>
  )
}