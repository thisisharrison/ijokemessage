import React from 'react'

const MessageDisplay = ({messages}) => {
  return (
    <>
      {messages.map(message => (
        <p className={message.className} key={message.id}>
          {message.joke}
        </p>
      ))}
    </>
  )
}

export default MessageDisplay
