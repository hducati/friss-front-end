import { render, screen } from '@testing-library/react'

import { Button } from './button'

describe('<Button />', () => {
  it('should render the medium size by default', () => {
    render(<Button>Buy now</Button>)

    expect(screen.getByRole('button', { name: /Buy now/i })).toHaveStyle({
      height: '3rem',
      padding: '0.6rem 0.8rem',
      'font-size': '1.4rem'
    })
  })

  it('should render the small size', () => {
    render(<Button size="small">Buy now</Button>)

    expect(screen.getByRole('button', { name: /Buy now/i })).toHaveStyle({
      height: '2rem',
      padding: '0.8rem',
      'font-size': '1.2rem'
    })
  })

  it('should render the large size', () => {
    render(<Button size="large">Buy now</Button>)

    expect(screen.getByRole('button', { name: /Buy now/i })).toHaveStyle({
      height: '5rem',
      padding: '0.8rem 1.2rem',
      'font-size': '1.6rem'
    })
  })

  it('should render fullWidth', () => {
    render(<Button fullWidth>Buy now</Button>)

    expect(screen.getByRole('button', { name: /Buy now/i })).toHaveStyle({
      width: "100%"
    })
  })
})