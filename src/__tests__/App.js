import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import faker from 'faker'
import Filter from 'bad-words'
import MessageForm from '../components/MessageForm'
import {setUpApp} from '../test/test_utils'

beforeEach(() => {
  jest.spyOn(console, 'error')
  console.error.mockImplementation(() => {})
})
afterEach(() => {
  console.error.mockRestore()
})

describe('<App />', () => {
  test('disable when input is empty ⛔️', () => {
    const {input, submit} = setUpApp()
    expect(input).toHaveTextContent('')
    expect(submit).toHaveAttribute('disabled')
  })

  test("submits child's reply 👶", () => {
    const {input, submit, message} = setUpApp()
    userEvent.type(input, message)
    userEvent.click(submit)
    const childMessage = screen.getByText(message)
    expect(childMessage).toHaveTextContent(message)
    expect(childMessage).toHaveClass('outgoing')
  })

  test('handleSubmmit 📤', () => {
    const handleSubmit = jest.fn()
    const filter = new Filter()
    const message = filter.clean(faker.lorem.sentence())
    const {getByRole} = render(<MessageForm onSubmit={handleSubmit} />)
    const input = getByRole('textbox')
    const submit = getByRole('button', {name: /send/i})
    userEvent.type(input, message)
    userEvent.click(submit)
    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({joke: message, className: 'outgoing'}),
    )
  })

  test('handles profanity 🤬', () => {
    const {input, submit, message, badWord} = setUpApp()
    userEvent.type(input, badWord)
    userEvent.click(submit)

    expect(console.error).toHaveBeenCalledTimes(2)
    const alert = screen.getByRole('alert')
    expect(alert.textContent).toMatchInlineSnapshot(
      // eslint-disable-next-line quotes
      `"Don't swear at your Dad!"`,
    )

    expect(input).not.toBeInTheDocument()
    expect(submit).not.toBeInTheDocument()
    const tryAgain = screen.getByRole('button', {name: /try again/i})
    expect(tryAgain).toBeInTheDocument()
    userEvent.click(tryAgain)
    expect(alert).not.toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /send/i})).toBeInTheDocument()
  })
})
