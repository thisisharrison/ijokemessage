import React from 'react'
import Header from './Header'
import MessageDisplay from './MessageDisplay'
import MessageForm from './MessageForm'
import {fetchDadJokes} from '../api'

const jokeReducer = (state, action) => {
  switch (action.type) {
    case 'PENDING':
      return Object.assign({}, state, {status: 'PENDING', error: null})
    case 'RESOLVED':
      return Object.assign({}, state, {
        status: 'RESOLVED',
        data: [...state.data, action.data],
        error: null,
      })
    case 'REJECTED':
      return Object.assign({}, state, {status: 'REJECTED', error: action.error})
    default:
      throw new Error(`What's going on with ${action.type}`)
  }
}

function useDadJoke(initialState) {
  const [state, dispatch] = React.useReducer(jokeReducer, {
    status: 'idle',
    data: [],
    ...initialState,
  })

  const run = React.useCallback(
    promise => {
      console.log('useCallback')
      dispatch({type: 'PENDING'})
      promise.then(
        data => {
          dispatch({type: 'RESOLVED', data})
        },
        error => dispatch({type: 'REJECTED', error}),
      )
    },
    [dispatch],
  )

  return {...state, dispatch, run}
}

// preload some conversations
const Chatroom = () => {
  const [reply, setReply] = React.useState('')

  const {data, status, error, dispatch, run} = useDadJoke({
    status: reply ? 'pending' : 'idle',
    data: window.localStorage.getItem('dad-jokes')
      ? window.localStorage.getItem('dad-jokes')
      : [],
  })

  React.useEffect(() => {
    // dad won't speak to me if I don't speak with him
    if (!reply) {
      return
    }
    dispatch({type: 'RESOLVED', data: reply})
    run(fetchDadJokes())
    // reset state
    setReply('')
  }, [dispatch, reply, run])

  function handleSubmit(data) {
    console.log('handleSubmit')
    setReply(data)
  }

  // for debugging
  window.fetchDadJokes = fetchDadJokes

  return (
    <div className="imessage">
      <Header />
      <pre>{JSON.stringify(status)}</pre>
      <MessageDisplay messages={data} status={status} />
      <MessageForm reply={reply} onSubmit={handleSubmit} />
    </div>
  )
}

export default Chatroom
