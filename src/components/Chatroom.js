import React from 'react'
import Header from './Header'
import MessageDisplay from './MessageDisplay'
import MessageForm from './MessageForm'
import {fetchDadJokes} from '../api'
import {ErrorBoundary} from 'react-error-boundary'
import {ProfanityFallback} from './ErrorBoundary'

const jokeReducer = (state, action) => {
  switch (action.type) {
    case 'PENDING':
      return Object.assign({}, state, {status: 'PENDING', error: null})
    case 'RESOLVED':
      return Object.assign({}, state, {
        status: 'RESOLVED',
        data: [...state.data, action.data],
        error: null,
        length: state.length + 1,
      })
    case 'REJECTED':
      return Object.assign({}, state, {
        status: 'REJECTED',
        error: action.error,
      })
    default:
      throw new Error(`What's going on with ${action.type}`)
  }
}

function useDadJoke(initialState, setHistory, setLength) {
  const [state, dispatch] = React.useReducer(jokeReducer, {
    status: 'idle',
    ...initialState,
  })

  const {length, data} = state

  const run = React.useCallback(
    promise => {
      dispatch({type: 'PENDING'})
      promise.then(
        data => {
          dispatch({type: 'RESOLVED', data})
        },
        error => {
          dispatch({type: 'REJECTED', error})
        },
      )
    },
    [dispatch],
  )

  const prevLength = React.useRef(length)

  // Only run this when prevLength is out of sync with state length
  const updateStorage = React.useCallback(() => {
    if (prevLength.current !== length) {
      setHistory(data)
      setLength(length)
      prevLength.current = length
    }
  }, [data, length, setHistory, setLength])

  // store chat history in localStorage
  React.useEffect(() => {
    updateStorage()
  }, [updateStorage])

  return {...state, dispatch, run}
}

// preload some conversations
const Chatroom = ({history, setHistory, length, setLength}) => {
  const [reply, setReply] = React.useState('')

  const {data, status, error, dispatch, run} = useDadJoke(
    {
      status: reply ? 'pending' : 'idle',
      data: history,
      length,
    },
    setHistory,
    setLength,
  )

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
    setReply(data)
  }

  // for debugging
  window.fetchDadJokes = fetchDadJokes

  const containerRef = React.useRef()

  React.useLayoutEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight
  })

  return (
    <div style={{width: '600px'}}>
      <div className="imessage-container" ref={containerRef} role="log">
        <Header />
        <MessageDisplay messages={data} status={status} error={error} />
      </div>
      <div>
        <ErrorBoundary
          FallbackComponent={ProfanityFallback}
          onReset={() => setReply('')}
        >
          <MessageForm reply={reply} onSubmit={handleSubmit} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default Chatroom
