import React from 'react'
import {render, screen} from '@testing-library/react'
import faker from 'faker'
import App from '../components/App'

function setUp() {
  render(<App />)
  const input = screen.getByRole('textbox')
  const submit = screen.getByRole('button', {name: /send/i})
  const message = faker.lorem.sentence()
  return {input, submit, message}
}

export {setUp}
