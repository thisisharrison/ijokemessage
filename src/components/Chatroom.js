import React from 'react'
import Header from './Header'
import MessageDisplay from './MessageDisplay'
import MessageForm from './MessageForm'
import {fetchDadJokes} from '../api'

const jokeReducer = (state, action) => {
  switch (action.type) {
    case 'pending':
      return Object.assign({}, state, {status: 'pending', error: null})
    case 'resolved':
      return Object.assign({}, state, {
        status: 'resolved',
        data: [...state.data, action.data],
        error: null,
      })
    case 'rejected':
      return Object.assign({}, state, {status: 'rejected', error: action.error})
    default:
      throw new Error(`What's going on with ${action}`)
  }
}

// preload some conversations
// message form onsubmit
// render your message
// fetch new messages
// add to state
// render new messages
const Chatroom = () => {
  const [state, dispatch] = React.useReducer(jokeReducer, {
    status: 'idle',
    data: [],
  })

  const handleClick = e => {
    dispatch({type: 'pending'})
    fetchDadJokes().then(data => {
      dispatch({type: 'resolved', data})
    })
  }

  // for debugging
  window.fetchDadJokes = fetchDadJokes

  return (
    <div className="imessage">
      <Header />
      <pre>{JSON.stringify(state)}</pre>
      <MessageDisplay messages={state.data} />
      <MessageForm />
      <button onClick={handleClick}>New Joke</button>
    </div>
  )
}

export default Chatroom
