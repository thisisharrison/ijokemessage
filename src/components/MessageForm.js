import React from 'react'
import {nanoid} from 'nanoid'

// add id for key and className for styling
function formatMessage(message) {
  return {
    joke: message,
    className: 'outgoing',
    id: nanoid(),
  }
}

// onSubmit will ccall setReply in Chatroom
// reply triggers useEffect and calls run from useDadJoke hook
const MessageForm = ({reply, onSubmit}) => {
  const [message, setMessage] = React.useState(reply)

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(formatMessage(message))
    setMessage('')
  }

  function handleChange(e) {
    setMessage(e.target.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={message}
          onChange={handleChange}
          name="messageForm"
          id="messageForm-input"
          placeholder="iDad Jokes"
        />
        <button type="submit" disabled={!message.length}>
          Send
        </button>
      </form>
    </>
  )
}

export default MessageForm
