// import dependencies
import React from 'react'

// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// the component to test
import Header from '../containers/Header'
import store from '../store'
import { logInSuccess } from '../store/actions'
// import react-testing methods
import { render, waitFor, screen, fireEvent } from '../test-utils'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'

// declare which API requests to mock
const server = setupServer(
  rest.post(
    'https://roadtripplaner-backend-develop.herokuapp.com/api/v1//sessions',
    (req, res, ctx) => {
      // respond using a mocked JSON body
      return res(
        ctx.json({
          data: {
            response: {
              userName: 'testuser',
              id: 2,
              email: 'test@test.at',
              isAdmin: true,
              picture: '',
              token: 'trstst',
            },
          },
        })
      )
    }
  )
)

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())

test('handlers unprocessed_entitiy', async () => {
  server.use(
    rest.post('/sessions', (req, res, ctx) => {
      return res(ctx.status(422))
    })
  )

  render(<Header />)

  fireEvent.click(screen.getByText('LogIn'))
  await waitFor(() => screen.getByRole('button'))

  fireEvent.click(screen.getByRole('button'))
  await waitFor(() => screen.getByRole('button'))

  expect(screen.getByText('SignUp')).toBeInTheDocument()
  expect(screen.getByRole('button')).toBeEnabled()
})

test('login successful', async () => {
  render(<Header />)

  fireEvent.click(screen.getByText('LogIn'))
  await waitFor(() => screen.getByRole('button'))

  fireEvent.click(screen.getByRole('button'))

  store.dispatch(
    logInSuccess({
      userName: 'testuser',
      id: '2',
      email: 'test@test.at',
      isAdmin: true,
      picture: '',
      token: 'trstst',
    })
  )

  expect(screen.getByText('testuser', { exact: false })).toBeInTheDocument()
  expect(screen.queryByText('SignUp')).not.toBeInTheDocument()
})
