import {render, screen} from '@testing-library/react'
import App from '../components/App'

test('renders Hello World', () => {
  render(<App />)
  expect(screen.getByText(/hello world/i)).toBeInTheDocument()
})
