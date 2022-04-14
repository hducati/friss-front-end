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
import { Spinner } from "components/spinner/spinner";
import { getModelByMakeName } from "services/get-model-by-make-name/get-model-by-make-name";
import * as S from './styles'

export const CreateFormulaScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [makeNameOptions, setMakeNameOptions] = useState<OptionType[]>([])
  const [modelNameOptions, setModelNameOptions] = useState<OptionType[]>([])

  const [errorMessage, setErrorMessage] = useState("")

  const emptyOption = {
    value: "",
    label: ""
  }

  const initialEntries = {
    makeName: emptyOption,
    modelName: emptyOption,
    year: 0,
    yearComparison: emptyOption,
    risk: emptyOption,
    fuel: emptyOption
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

    if (formula.makeName['value']) fetchData()
  }, [formula.makeName])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!formula.risk['value']) return setErrorMessage("Risk is mandatory!")
    if (!formula.makeName['value'] && !formula.modelName['value'] && !formula.year && !formula.fuel['value']) {
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
    setFormula({...formula, makeName: option!, modelName: emptyOption})
  }

  return (
    <form onSubmit={handleSubmit}>
        {isLoading ? < Spinner /> : (
          <S.FormContainer>
            <S.Wrapper>
              <S.Heading>Create Formula</S.Heading>
              <S.Grid>
                <S.InputWrapper>
                  <S.Label>Make name</S.Label>
                  <Select
                    aria-label="select-makeName"
                    value={formula.makeName}
                    options={makeNameOptions}
                    onChange={option => onMakeNameChange(option)}
                    placeholder="Select an option" 
                  />
                </S.InputWrapper>
                <S.InputWrapper>
                  <S.Label>Model name</S.Label>
                  <Select
                    aria-label="select-modelName"
                    value={formula.modelName}
                    options={modelNameOptions}
                    onChange={option => setFormula({...formula, modelName: option!})}
                    placeholder="Select an option" 
                  />
                </S.InputWrapper>
                <S.InputWrapper>
                  <S.Label>Year comparison</S.Label>
                  <Select
                    aria-label="select-yearComparison"
                    value={formula.yearComparison}
                    options={yearComparisonType}
                    onChange={option => setFormula({...formula, yearComparison: option!})}
                    placeholder="Select an option" 
                  />
                </S.InputWrapper>
                <S.InputWrapper>
                  <S.Label>Year</S.Label>
                  <InputField
                    type="number"
                    name="Year"
                    placeholder="Year"
                    value={formula.year}
                    onChange={event => setFormula({...formula, year: Number(event.target.value)})}
                  />
                </S.InputWrapper>
                <S.InputWrapper>
                  <S.Label>Fuel</S.Label>
                  <Select
                    aria-label="select-fuel"
                    value={formula.fuel}
                    options={fuelType}
                    onChange={option => setFormula({...formula, fuel: option!})}
                    placeholder="Select an option" 
                  />
                </S.InputWrapper>
                <S.InputWrapper>
                  <S.Label>Risk</S.Label>
                  <Select
                    aria-label="select-risk"
                    value={formula.risk}
                    options={riskType}
                    onChange={option => setFormula({...formula, risk: option!})}
                    placeholder="Select an option" 
                  />
                </S.InputWrapper>
              </S.Grid>
              <Button fullWidth>Submit</Button>
              {!!errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
            </S.Wrapper>
          </S.FormContainer>
        )}
    </form>
  )
}