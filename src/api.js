function randomDelay(callback = {}) {
  return new Promise(resolve =>
    setTimeout(() => {
      return resolve(console.log('I slept well'))
    }, 3000),
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
          return Promise.reject('Bad')
        } else {
          data.className = 'incoming'
          return Promise.resolve(data)
        }
      }
    })
}

export const fetchDadJokes = async () => {
  await randomDelay()
  return randomDadJoke()
}
