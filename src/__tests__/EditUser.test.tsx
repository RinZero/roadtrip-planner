// import dependencies
import React from 'react'

// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// the component to test
import Header from '../containers/Header'
import ProfilePage from '../containers/ProfilePage'
import store from '../store'
import { logInSuccess, updateUser } from '../store/actions'
import { render, waitFor, screen, fireEvent } from '../test-utils'
// import react-testing methods

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
              userName: 'MyName',
              id: 3,
              email: 'some@email.at',
              isAdmin: true,
              picture: '',
              token: 'abcdef',
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

test('login and check profile', async () => {
  render(<Header />)

  fireEvent.click(screen.getByText('LogIn'))
  await waitFor(() => screen.getByRole('button'))

  fireEvent.click(screen.getByRole('button'))

  store.dispatch(
    logInSuccess({
      userName: 'MyName',
      id: '3',
      email: 'some@email.at',
      isAdmin: true,
      picture: '',
      token: 'abcdef',
    })
  )

  expect(screen.getByText('MyName', { exact: false })).toBeInTheDocument()

  fireEvent.click(screen.getByLabelText('profile'))
  render(<ProfilePage />)

  expect(
    screen.getByText('Meine Roadtrips:', { exact: false })
  ).toBeInTheDocument()
  expect(
    screen.getByText('some@email.at', { exact: false })
  ).toBeInTheDocument()
})

test('change name, email and add picture', async () => {
  render(<ProfilePage />)
  expect(
    screen.getByText('some@email.at', { exact: false })
  ).toBeInTheDocument()
  store.dispatch(
    updateUser({
      userName: 'MyNewName',
      email: 'new@email.com',
      password: 'password123',
      picture: 'https://img.jpg',
    })
  )
  expect(screen.getByText('MyNewName')).toBeInTheDocument()
  expect(screen.getByText('new@email.com')).toBeInTheDocument()
  expect(screen.getByAltText('Profilbild')).toHaveAttribute(
    'src',
    'https://img.jpg'
  )
})

test('delete account', async () => {
  render(<ProfilePage />)
  expect(
    screen.getByText('new@email.com', { exact: false })
  ).toBeInTheDocument()
  store.dispatch(
    logInSuccess({
      userName: 'Guest',
      email: '',
      isAdmin: false,
      roadtrips: [],
      locations: [],
      id: 'guest',
      picture: undefined,
      token: '',
    })
  )
  render(<Header />)
  expect(screen.getByText('SignUp')).toBeInTheDocument()
})
