export const fetchDadJokes = () => {
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
