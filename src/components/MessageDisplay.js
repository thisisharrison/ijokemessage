import React from 'react'
import Loader from './Loader'

const MessageDisplay = ({messages, status}) => {
  return (
    <>
      {messages.map(message => (
        <p className={message.className} key={message.id}>
          {message.joke}
        </p>
      ))}
      {status === 'PENDING' ? (
        <p className="incoming loader" aria-label="loading...">
          <Loader />
        </p>
      ) : null}
    </>
  )
}

export default MessageDisplay
