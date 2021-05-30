import React from 'react'
import {render, screen} from '@testing-library/react'
import faker from 'faker'
import Filter from 'bad-words'
import App from '../components/App'
import Chatroom from '../components/Chatroom'

const filter = new Filter()

function setUpApp() {
  render(<App />)
  const input = screen.getByRole('textbox')
  const submit = screen.getByRole('button', {name: /send/i})
  const message = filter.clean(faker.lorem.words())
  const badWord = filter.list[10]
  return {input, submit, message, badWord}
}

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

export {setUpApp, initialState, initialLength, setUpChatroom}
