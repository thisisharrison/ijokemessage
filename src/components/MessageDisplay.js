import React from 'react'
import Loader from './Loader'

const MessageDisplay = ({messages, status, error}) => {
  return (
    <div className="imessage">
      {messages.map(message => (
        <p className={message.className} key={message.id}>
          {message.joke}
        </p>
      ))}
      {status === 'PENDING' ? <Loader /> : null}
      {status === 'REJECTED' ? <div role="alert">{error.error}</div> : null}
    </div>
  )
}

export default MessageDisplay
