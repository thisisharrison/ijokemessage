import React from 'react'
import Chatroom from './Chatroom'
import EndpointToggle from './Toggle'
import {EndpointContextProvider} from '../context/context'

// To-do:
// useContext for theme

// returns initial state for chat history and chat length
function useLocalStorageState(key, initialState) {
  const [state, setState] = React.useState(() => {
    const records = window.localStorage.getItem(key)
    if (records) {
      try {
        return JSON.parse(records)
      } catch (error) {
        window.localStorage.removeItem(key)
      }
    } else {
      return initialState
    }
  })

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(key)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

function App() {
  const [history, setHistory] = useLocalStorageState('dad-jokes', [])
  const [length, setLength] = useLocalStorageState('dad-jokes-length', 0)
  return (
    <EndpointContextProvider>
      <div className="app">
        <Chatroom
          history={history}
          setHistory={setHistory}
          length={length}
          setLength={setLength}
        />
        <EndpointToggle />
      </div>
    </EndpointContextProvider>
  )
}

export default App
