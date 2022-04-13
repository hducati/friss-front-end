export interface Formula {
  id: string
  makeName: string
  modelName: string
  yearComparisonType: string
  year: number
  fuelType: string
  risk: string
  createdAt: Date;
}

export type FormulaInput = Omit<Formula, "id" | "createdAt">

export interface FormulaContextData {
  formulas: Formula[]
  createFormula: (formulaInput: FormulaInput) => Promise<void>
  deleteFormula: (id: string) => void
}

export interface FormulaProviderProps {
  children: React.ReactNode
}