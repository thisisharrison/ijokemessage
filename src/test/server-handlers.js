import {rest} from 'msw'

// https://icanhazdadjoke.com/api#endpoints
const jokeResponse = {
  id: 'R7UfaahVfFd',
  joke: 'My dog used to chase people on a bike a lot. It got so bad I had to take his bike away.',
  status: 200,
}

const handlers = [
  rest.get('https://icanhazdadjoke.com/', async (req, res, ctx) => {
    return res(
      ctx.json(jokeResponse),
      ctx.set('Content-type', 'application/json'),
    )
  }),
]

export {handlers, jokeResponse}
