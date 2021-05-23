import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import Chatroom from '../components/Chatroom'

const initialState = [
  {
    joke: 'hey',
    className: 'outgoing',
    id: '7fiQWwZkX4tNF0vFdRK82',
  },
  {
    id: 'RuHYTSvzsrc',
    joke: "My wife told me to rub the herbs on the meat for better flavor. That's sage advice.",
    status: 200,
    className: 'incoming',
  },
  {
    joke: 'lol',
    className: 'outgoing',
    id: 'RR91v5EgrAVZ5f3tjKTGV',
  },
  {
    id: '8p49pWvcxAd',
    joke: 'Every night at 11:11, I make a wish that someone will come fix my broken clock.',
    status: 200,
    className: 'incoming',
  },
]

const initialLength = initialState.length

function setUpChatroom() {
  const setHistory = jest.fn()
  const setLength = jest.fn()
  render(
    <Chatroom
      history={initialState}
      setHistory={setHistory}
      length={initialLength}
      setLength={setLength}
    />,
  )
  const input = screen.getByRole('textbox')
  const button = screen.getByRole('button', {name: /send/i})
  return {setHistory, setLength, input, button, length}
}

describe('<Chatroom />', () => {
  test('should render initial state', () => {
    setUpChatroom()
    for (const message of initialState) {
      const text = screen.getByText(message.joke)
      expect(text).toBeInTheDocument()
      expect(text).toHaveClass(message.className)
    }
  })

  test('should store messages to localStorage', () => {
    const {setHistory, setLength, length, input, button} = setUpChatroom()
    expect(setHistory).toHaveBeenCalledTimes(0)
    expect(setLength).toHaveBeenCalledTimes(0)
    userEvent.type(input, faker.lorem.sentence())
    userEvent.click(button)
    expect(setHistory).toHaveBeenCalledTimes(1)
    expect(setLength).toHaveBeenCalledTimes(1)
  })
})
