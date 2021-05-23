function randomDelay(callback = {}) {
  return new Promise(resolve =>
    setTimeout(() => {
      return resolve(console.log('I slept well'))
    }, 1500),
  )
}

const randomDadJoke = () => {
  return window
    .fetch('https://icanhazdadjoke.com/', {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    })
    .then(async response => {
      const data = await response.json()
      if (response.ok) {
        const joke = data?.joke
        if (!joke) {
          return Promise.reject(data)
        } else {
          data.className = 'incoming'
          return Promise.resolve(data)
        }
      } else {
        return Promise.reject(data)
      }
    })
    .catch(error => {
      const message = {error: error}
      return Promise.reject(message)
    })
}

const fetchDadJokes = async () => {
  // await randomDelay()
  return randomDadJoke()
}

export {fetchDadJokes, randomDelay}
