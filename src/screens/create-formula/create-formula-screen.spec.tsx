import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'

import { CreateFormulaScreen } from './create-formula-screen'

jest.mock('hooks/use-formula/use-formula', () => {
  return {
    useFormula: () => {
      return {
        formulas: [],
        createFormula: jest.fn(),
        deleteFormula: jest.fn(),
      }
    }
  }
})

export async function selectItem(
  label: string,
  choice: string
): Promise<void> {
  const KEY_DOWN = 40
  const labelFound = screen.getByLabelText(label)
  fireEvent.focus(labelFound)
  fireEvent.keyDown(labelFound, {
    keyCode: KEY_DOWN,
  })

  await waitFor(() => labelFound)

  fireEvent.click(screen.getByText(choice))
}

describe('<CreateFormulaScreen />', () => {
  it('should render items correctly', async () => {
    const history = createMemoryHistory();
    const pushSpy = jest.spyOn(history, 'push')
    const toBeCalled = 1;

    jest.spyOn(React, "useEffect")
      .mockImplementation(() => jest.fn())

    render(
      <Router history={history}>
        <CreateFormulaScreen />
      </Router>
    )

    await selectItem('select-risk', 'Medium')
    await selectItem('select-yearComparison', '>')
    await selectItem('select-fuel', 'Diesel')

    const button = screen.getByRole('button', { name: /submit/i})

    userEvent.click(button);

    await waitFor(() => button);
    
    expect(pushSpy).toHaveBeenCalledTimes(toBeCalled);
  })

  it('should render risk errorMessage when risk is not provided', async () => {
    const history = createMemoryHistory();

    jest.spyOn(React, "useEffect")
      .mockImplementation(() => jest.fn())

    render(
      <Router history={history}>
        <CreateFormulaScreen />
      </Router>
    )

    await selectItem('select-yearComparison', '>')
    await selectItem('select-fuel', 'Diesel')

    const button = screen.getByRole('button', { name: /submit/i})

    userEvent.click(button);

    await waitFor(() => button);

    const errorMessage = screen.getByText('Risk is mandatory!')
    
    expect(errorMessage).toBeInTheDocument();
  })

  it('should render parameter errorMessage when params are not provided', async () => {
    const history = createMemoryHistory();

    jest.spyOn(React, "useEffect")
      .mockImplementation(() => jest.fn())

    render(
      <Router history={history}>
        <CreateFormulaScreen />
      </Router>
    )

    await selectItem('select-risk', 'Medium')

    const button = screen.getByRole('button', { name: /submit/i})

    userEvent.click(button);

    await waitFor(() => button);

    const errorMessage = screen.getByText('At least one parameter must be selected (make, model, year, fuel).')
    
    expect(errorMessage).toBeInTheDocument();
  })
})