import React from 'react'
import Loader from './Loader'

const MessageDisplay = ({messages, status, error}) => {
  return (
    <>
      {messages.map(message => (
        <p className={message.className} key={message.id}>
          {message.joke}
        </p>
      ))}
      {status === 'PENDING' ? (
        <div className="incoming loader" aria-label="loading...">
          <Loader />
        </div>
      ) : null}
      {status === 'REJECTED' ? <div role="alert">{error.error}</div> : null}
    </>
  )
}

export default MessageDisplay
