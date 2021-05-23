import {screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {handlers, jokeResponse} from '../test/server-handlers'
import {setUp} from '../test/app-setup'

// create mock server
const server = setupServer(...handlers)

beforeAll(() => server.listen())
// clean up for server errors
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const errorMessage = 'Dad has left the chat'

describe('Dad jokes api', () => {
  test('displays new joke as incoming message', async () => {
    const {input, submit, message} = setUp()
    userEvent.type(input, message)
    userEvent.click(submit)
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
    expect(screen.getByText(jokeResponse.joke)).toBeInTheDocument()
    expect(screen.getByText(jokeResponse.joke)).toHaveClass('incoming')
  })

  test('renders unknown server error', async () => {
    server.use(
      rest.get('https://icanhazdadjoke.com/', async (req, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json(errorMessage),
          ctx.set('Content-type', 'application/json'),
        )
      }),
    )
    const {input, submit, message} = setUp()
    userEvent.type(input, message)
    userEvent.click(submit)
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
    expect(screen.getByRole('alert')).toHaveTextContent(errorMessage)
  })

  test('renders no joke error', async () => {
    server.use(
      rest.get('https://icanhazdadjoke.com/', async (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(errorMessage),
          ctx.set('Content-type', 'application/json'),
        )
      }),
    )
    const {input, submit, message} = setUp()
    userEvent.type(input, message)
    userEvent.click(submit)
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
    expect(screen.getByRole('alert')).toHaveTextContent(errorMessage)
  })
})
