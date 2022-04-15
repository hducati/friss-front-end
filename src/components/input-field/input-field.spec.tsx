import { fireEvent, render, screen } from '@testing-library/react'

import { InputField } from './input-field'


describe('<InputField />', () => {
  it('should render input correctly', () => {
    render(<InputField name="year" placeholder="Year" />)

    expect(screen.getByPlaceholderText(/year/i)).toBeInTheDocument()
  })

  it("should handle onChange event", () => {
    const onChange = jest.fn();
    const twoTimes = 2;

    render(<InputField onChange={onChange} placeholder="Year" />)
    
    const input = screen.getByPlaceholderText(/year/i)

    fireEvent.change(input, { target: { value: 1 }})
    fireEvent.change(input, { target: { value: 4}})

    expect(onChange).toHaveBeenCalledTimes(twoTimes)
  })

  it("should render label when provided", () => {
    const fakeLabel = "fake-label"
    render(<InputField label={fakeLabel} placeholder="Year" />)

    expect(screen.getByText(fakeLabel)).toBeInTheDocument();
  })

  it("should render errorMessage when provided", () => {
    const errorMessage = "fake-errorMessage"
    render(<InputField error={errorMessage} placeholder="Year" />)

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  })
})