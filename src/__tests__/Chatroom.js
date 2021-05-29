import React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import {initialState, initialLength, setUpChatroom} from '../test/test_utils'

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

  test('should scroll to the bottom', () => {
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
})
