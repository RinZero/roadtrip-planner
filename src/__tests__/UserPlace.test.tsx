import { rest } from 'msw'
import { setupServer } from 'msw/node'

import Header from '../containers/Header'
import NewPlacePage from '../containers/NewPlacePage'
import ProfilePage from '../containers/ProfilePage'
import store from '../store'
import { getLocationsByUserSuccess, logInSuccess } from '../store/actions'
import { LocationState } from '../store/user/types'
import { render, waitFor, screen, fireEvent } from '../test-utils'
import '@testing-library/jest-dom/extend-expect'

const server = setupServer(
  rest.post(
    'https://roadtripplaner-backend-develop.herokuapp.com/api/v1/user_entries',
    (req, res, ctx) => {
      return res(
        ctx.json({
          data: {
            type: 'user_entry',
            userId: 2,
            attributes: {
              public: false,
              id: 2,
              name: 'Lieblingsort',
              description: 'ruhig und schöne Aussicht',
              latitude: 12,
              longitude: 47,
              category: '',
            },
          },
          status: 'Deine neue Location wurde erstellt!',
        })
      )
    }
  ),
  rest.get(
    'https://roadtripplaner-backend-develop.herokuapp.com/api/v1/user_entries',
    (req, res, ctx) => {
      return res(
        ctx.json({
          data: {
            id: '1',
            name: 'Lieblingsplatz',
            longitude: 4,
            latitude: 15,
            category: '',
            description: 'ruhig und schöne Aussicht',
            user_id: 2,
          },
        })
      )
    }
  )
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Login, click on Link in Header and render New Place Page', async () => {
  // Simulate LoggedIn User
  store.dispatch(
    logInSuccess({
      userName: 'testuser',
      id: '2',
      email: 'test@test.at',
      isAdmin: false,
      picture: '',
      token: 'trstst',
    })
  )
  render(<Header />)
  fireEvent.click(screen.getByText('Ort hinzufügen'))
  await waitFor(() => render(<NewPlacePage match={{ params: { id: '' } }} />))
  expect(
    screen.getByRole('button', { name: 'Neuen Ort erstellen' })
  ).toBeInTheDocument()
})

test('fill in form, submit and check if it worked', async () => {
  render(<NewPlacePage match={{ params: { id: '' } }} />)
  // Fill in form
  const inputName = screen.getByLabelText('Name')
  fireEvent.change(inputName, { target: { value: 'Lieblingsplatz' } })
  const inputDescription = screen.getByLabelText('Beschreibung')
  fireEvent.change(inputDescription, {
    target: { value: 'ruhig und schöne Aussicht' },
  })
  const inputLat = screen.getByLabelText('Breitengrad')
  fireEvent.change(inputLat, { target: { value: 12 } })
  const inputLng = screen.getByLabelText('Längengrad')
  fireEvent.change(inputLng, { target: { value: 47 } })

  const inputCategory = screen.getByLabelText('Kategorien')
  fireEvent.change(inputCategory, { target: { value: 'Aussichtspunkt' } })
  fireEvent.click(screen.getByRole('presentation'))

  // submit
  fireEvent.click(screen.getByRole('button', { name: 'Neuen Ort erstellen' }))
  // check
  await waitFor(() => screen.getByText('Deine neue Location wurde erstellt!'))
  // Add it to Store
  const newLocationObj: { locations: LocationState[] | undefined } = {
    locations: [
      {
        id: '1',
        name: 'Lieblingsplatz',
        longitude: 4,
        latitude: 15,
        category: '',
        description: 'ruhig und schöne Aussicht',
      },
    ],
  }
  store.dispatch(getLocationsByUserSuccess(newLocationObj))
})

test('check if new place is in profile, render edit, edit place, check in profile if it worked', async () => {
  // check if new place is in profiel
  render(<ProfilePage />)
  await waitFor(() => screen.getByText('Meine Orte:'))
  expect(screen.getByText('Lieblingsplatz')).toBeInTheDocument()

  // edit place
  render(<NewPlacePage match={{ params: { id: ':1' } }} />)
  const inputName = screen.getByLabelText('Name')
  fireEvent.change(inputName, { target: { value: 'Mein Lieblingsplatz' } })
  const inputDescription = screen.getByLabelText('Beschreibung')
  fireEvent.change(inputDescription, {
    target: { value: 'ruhig und schöne Aussicht' },
  })
  const inputLat = screen.getByLabelText('Breitengrad')
  fireEvent.change(inputLat, { target: { value: 12 } })
  const inputLng = screen.getByLabelText('Längengrad')
  fireEvent.change(inputLng, { target: { value: 47 } })
  // submit
  fireEvent.click(screen.getByRole('button', { name: 'Neuen Ort erstellen' }))

  // simulate edit
  const editedLocationObj: { locations: LocationState[] | undefined } = {
    locations: [
      {
        id: '1',
        name: 'Mein Lieblingsplatz',
        longitude: 4,
        latitude: 15,
        category: '',
        description: 'ruhig und schöne Aussicht',
      },
    ],
  }
  store.dispatch(getLocationsByUserSuccess(editedLocationObj))

  // check edited Place with new name is in profile
  render(<ProfilePage />)
  const editedPlace = screen.getAllByText('Mein Lieblingsplatz')
  expect(editedPlace[0]).toBeTruthy()
})

test('check if place is in profile, click delete, check if it worked', async () => {
  render(<ProfilePage />)
  await waitFor(() => screen.getByText('Meine Orte:'))
  expect(screen.getByText('Mein Lieblingsplatz')).toBeInTheDocument()
  // check number of user's places
  const listBefore: HTMLElement = screen.getByRole('list')
  expect(listBefore.childNodes.length === 1).toBe(true)

  const buttons: Array<HTMLElement> = screen.getAllByRole('button')
  // click delete of first place
  fireEvent.click(buttons[2])
  //simulate delete
  const deletedLocationObj: { locations: LocationState[] | undefined } = {
    locations: [],
  }
  store.dispatch(getLocationsByUserSuccess(deletedLocationObj))

  //  check number of user's places again - it should be shorter now
  const listAfter: HTMLElement = screen.getByRole('list')
  expect(listAfter.childNodes.length === 0).toBe(true)
})
