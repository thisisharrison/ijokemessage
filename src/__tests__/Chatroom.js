import {screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {initialState, setUpChatroom} from '../test/test_utils'

describe('<Chatroom />', () => {
  test('should render initial state ☝️', () => {
    setUpChatroom()
    for (const message of initialState) {
      const text = screen.getByText(message.joke)
      expect(text).toBeInTheDocument()
      expect(text).toHaveClass(message.className)
    }
  })

  test('should store messages to localStorage 📭', () => {
    const {setHistory, setLength, input, button, message} = setUpChatroom()
    expect(setHistory).toHaveBeenCalledTimes(0)
    expect(setLength).toHaveBeenCalledTimes(0)
    userEvent.type(input, message)
    userEvent.click(button)
    expect(setHistory).toHaveBeenCalledTimes(1)
    expect(setLength).toHaveBeenCalledTimes(1)
  })

  test('should scroll to the bottom 🛗', () => {
    setUpChatroom()
    const log = screen.getByRole('log')
    const scrollToTopSetter = jest.fn()
    Object.defineProperties(log, {
      scrollHeight: {
        get() {
          return 100
        },
      },
      scrollTop: {
        get() {
          return 0
        },
        set: scrollToTopSetter,
      },
    })
    userEvent.type(screen.getByRole('textbox'), 'hey dad')
    userEvent.click(screen.getByRole('button', {name: /send/i}))

    // once with outgoing message, second with loading
    expect(scrollToTopSetter).toHaveBeenCalledTimes(2)
    expect(scrollToTopSetter).toHaveBeenCalledWith(log.scrollHeight)

    scrollToTopSetter.mockClear()
  })

  test('should have blue style for rest implementation', () => {
    const {input, button, message} = setUpChatroom({intitialEndpoint: 'rest'})
    userEvent.type(input, message)
    userEvent.click(button)
    expect(screen.getByText(message)).toHaveClass('outgoing')
  })

  test('should have purple style for graphql implementation', () => {
    const {input, button, message} = setUpChatroom({
      intitialEndpoint: 'graphql',
    })
    userEvent.type(input, message)
    userEvent.click(button)
    expect(screen.getByText(message)).toHaveClass('outgoing graphql')
  })
})
