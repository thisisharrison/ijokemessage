import React from 'react'
import {nanoid} from 'nanoid'
import Filter from 'bad-words'

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
const MessageForm = ({reply = '', onSubmit}) => {
  const [message, setMessage] = React.useState(reply)
  const [unclean, setUnclean] = React.useState(false)
  const filter = React.useMemo(() => new Filter(), [])

  function handleSubmit(e) {
    e.preventDefault()
    // check if user is swearing
    if (filter.isProfane(message)) {
      setUnclean(true)
    } else {
      onSubmit(formatMessage(message))
      setMessage('')
    }
  }

  function handleChange(e) {
    setMessage(e.target.value)
  }

  if (unclean) throw {message: "Don't swear at your Dad!"}

  return (
    <>
      <form onSubmit={handleSubmit} className="message-form" autoComplete="off">
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
