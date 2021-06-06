import React from 'react'
import Loader from './Loader'
import {useEndpointContext} from '../context/context'

const MessageDisplay = ({messages, status, error}) => {
  const [endpoint] = useEndpointContext()
  const endpointEffect = endpoint === 'rest' ? '' : ' graphql'
  return (
    <div className="imessage">
      {messages.map(message => (
        <p
          className={
            message.className === 'incoming'
              ? message.className
              : message.className + endpointEffect
          }
          key={message.id}
        >
          {message.joke}
        </p>
      ))}
      {status === 'PENDING' ? <Loader /> : null}
      {status === 'REJECTED' ? <div role="alert">{error.error}</div> : null}
    </div>
  )
}

export default MessageDisplay
