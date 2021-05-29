import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import MessageForm from '../components/MessageForm'
import {setUpApp} from '../test/test_utils'

describe('<App />', () => {
  test('disable when input is empty', () => {
    const {input, submit} = setUpApp()
    expect(input).toHaveTextContent('')
    expect(submit).toHaveAttribute('disabled')
  })

  test("submits child's reply", () => {
    const {input, submit, message} = setUpApp()
    userEvent.type(input, message)
    userEvent.click(submit)
    const childMessage = screen.getByText(message)
    expect(childMessage).toHaveTextContent(message)
    expect(childMessage).toHaveClass('outgoing')
  })

  test('handleSubmmit', () => {
    const handleSubmit = jest.fn()
    const message = faker.lorem.sentence()
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
})
