import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

import { FormulaList } from './formula-list'

const mockFormulas = [
  {
    id: "dasdgkow00q9d01",
    makeName: "john",
    modelName: "doe",
    risk: "medium",
    year: 2,
    yearComparisonType: ">",
    fuelType: "diesel",
    createdAt: new Date()
  },
  {
    id: "dasdgkow00q9d02",
    makeName: "lucas",
    modelName: "abc",
    risk: "high",
    year: 3,
    yearComparisonType: "=",
    fuelType: "diesel",
    createdAt: new Date()
  }
]

describe('<FormulaList />', () => {
  it('should render items correctly', () => {
    render(<FormulaList formulas={mockFormulas} onRemove={jest.fn()} />)

    expect(screen.getByText(mockFormulas[0].id)).toBeInTheDocument()
    expect(screen.getByText(mockFormulas[1].id)).toBeInTheDocument()
  })

  it("should handle delete event", async () => {
    const onRemove = jest.fn()
    const oneTime = 1
    render(<FormulaList formulas={mockFormulas} onRemove={onRemove} />)

    const deleteButton = screen.getByRole('button', { name: /delete-dasdgkow00q9d01/i})
    userEvent.click(deleteButton)

    await waitFor(() => deleteButton)

    expect(onRemove).toHaveBeenCalledTimes(oneTime)
  })
})