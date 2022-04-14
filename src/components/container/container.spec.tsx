import { render, screen } from '@testing-library/react'

import { Container } from './container'

describe('<Button />', () => {
  it('should render children correctly', () => {
    render(<Container><span>Hello world</span></Container>)

    expect(screen.getByText(/hello world/i)).toBeInTheDocument()
  })
})