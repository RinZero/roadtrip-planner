// import dependencies
import React from 'react'

// import API mocking utilities from Mock Service Worker
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// the component to test
import App from '../App'
import Header from '../containers/Header'
import ProfilePage from '../containers/ProfilePage'
import store from '../store'
import {
  getRoadtripsByUserSuccess,
  logInSuccess,
  setIsTest,
} from '../store/actions'
// import react-testing methods
import { render, waitFor, fireEvent, screen } from '../test-utils'
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

//set local test-flag
store.dispatch(setIsTest())

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
  await waitFor(() => screen.getByRole('button', { name: 'LogIn' }))

  fireEvent.click(screen.getByRole('button', { name: 'LogIn' }))

  store.dispatch(
    logInSuccess({
      userName: 'testuser',
      id: '2',
      email: 'test@test.at',
      isAdmin: true,
      picture: '',
      token: 'trstst',
      roadtrips: [
        {
          name: 'testingtrip',
          stops: [
            { id: 'stop1', name: 'stop1' },
            { id: 'stop2', name: 'stop2' },
            { id: 'stop3', name: 'stop3' },
          ],
          distance: 500,
          id: 1,
          public: true,
        },
      ],
    })
  )

  expect(screen.getByText('testuser', { exact: false })).toBeInTheDocument()
  expect(screen.queryByText('SignUp')).not.toBeInTheDocument()
})

test('profile is reachable + has the right data, roadtrips are editable', async () => {
  render(<App />)
  fireEvent.click(screen.getAllByRole('button')[0])
  expect(
    screen.getByText('Meine Roadtrips', { exact: false })
  ).toBeInTheDocument()

  expect(screen.queryByText('testingtrip')).toBeInTheDocument()
  expect(screen.queryByText('3 Stops')).toBeInTheDocument()
  expect(screen.queryByText('10 Stops')).not.toBeInTheDocument()

  fireEvent.click(screen.getAllByRole('button', { name: 'Route' })[0])
  expect(screen.queryAllByText('Roadtrip-Name')[0]).toBeInTheDocument()

  expect(screen.queryByText('stop1')).toBeInTheDocument()
  // eslint-disable-next-line no-console
  console.log(screen.getAllByRole('button').length)

  fireEvent.click(screen.getAllByRole('button')[5]) //found via trial and error, can't acces in another way, because of material ui
  expect(screen.queryByText('stop1')).not.toBeInTheDocument()
  expect(screen.queryByText('stop2')).toBeInTheDocument()
  expect(screen.queryByText('stop3')).toBeInTheDocument()

  userEvent.type(screen.queryAllByText('Roadtrip-Name')[0], 'Changed^^^^')
  fireEvent.click(screen.getByRole('button', { name: 'Erstellen' }))
  render(<ProfilePage />)
  expect(
    screen.getByText('Meine Roadtrips', { exact: false })
  ).toBeInTheDocument()

  store.dispatch(
    getRoadtripsByUserSuccess({
      roadtrips: [
        {
          name: 'Changed^^^^',
          stops: [
            { id: 'stop2', name: 'stop2' },
            { id: 'stop3', name: 'stop3' },
          ],
          distance: 500,
          id: 1,
          public: true,
        },
      ],
    })
  )

  expect(screen.queryByText('Changed^^^^')).toBeInTheDocument()
  expect(screen.queryByText('2 Stops')).toBeInTheDocument()
  expect(screen.queryByText('3 Stops')).not.toBeInTheDocument()
})
