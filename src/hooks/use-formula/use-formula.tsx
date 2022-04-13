import { createContext, useContext, useEffect, useState } from "react";
import { api } from "services/api";
import { v4 as uuidv4 }from 'uuid';
import { Formula, FormulaInput, FormulaProviderProps, FormulaContextData } from "./types";

const FormulaContext = createContext<FormulaContextData>(
  {} as FormulaContextData
);

export function FormulaProvider({ children }: FormulaProviderProps) {
  const [formulas, setFormulas] = useState<Formula[]>([])

  useEffect(() => {
    api.get('formulas')
      .then(response => setFormulas(response.data.formulas))
  }, [])

  async function createFormula(formulaInput: FormulaInput) {
    const formula: Formula = {
      ...formulaInput,
      id: uuidv4(),
      createdAt: new Date()
    }

    setFormulas([
      ...formulas,
      formula
    ])
  }

  function deleteFormula(id: string) {
    const newFormulas = formulas.filter(formula => formula.id !== id)

    setFormulas([
      ...newFormulas
    ])
  }

  return (
    <FormulaContext.Provider value={{ formulas, createFormula, deleteFormula }}>
      {children}
    </FormulaContext.Provider>
  )
}

export function useFormula() {
  const context = useContext(FormulaContext);

  return context;
}