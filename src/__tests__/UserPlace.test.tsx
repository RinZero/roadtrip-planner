import { rest } from 'msw'
import { setupServer } from 'msw/node'

import Header from '../containers/Header'
import NewPlacePage from '../containers/NewPlacePage'
import ProfilePage from '../containers/ProfilePage'
import store from '../store'

// the component to test
import { getLocationsByUserSuccess, logInSuccess } from '../store/actions'
// import react-testing methods
import { LocationState } from '../store/user/types'
import { render, waitFor, screen, fireEvent } from '../test-utils'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'

const server = setupServer(
  rest.post(
    'https://roadtripplaner-backend-develop.herokuapp.com/api/v1/user_entries',
    (req, res, ctx) => {
      // respond using a mocked JSON body
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
      // respond using a mocked JSON body
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

// Klick auf Neuen Ort erstellen
// Ist Formular da?
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
  await waitFor(() =>
    screen.getByRole('button', { name: 'Neuen Ort erstellen' })
  )
})

// Formular ausfüllen
// Erstellen Button drücken
// Hat es funktioniert?
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
  //   await waitFor(() => screen.getByText('Du musst angemeldet sein.'))
  await waitFor(() => screen.getByText('Deine neue Location wurde erstellt!'))
})

// Auf Profil klicken
// Profil da?
// Orte Container auf Profilpage da?
// der neue Ort da?
// Ort bearbeiten Klicken
// ist Formular wieder da?
// ist es schon ausgefüllt?
// etwas ändern
// submit Klicken
// Hats funktioniert?
// test('check if new place is in profile, click edit, check and edit place, check in profile if it worked', async () => {
//   store.dispatch(
//     logInSuccess({
//       userName: 'testuser',
//       id: '2',
//       email: 'test@test.at',
//       isAdmin: true,
//       picture: '',
//       token: 'trstst',
//     })
//   )
//   const newLocationObj: { locations: LocationState[] | undefined } = {
//     locations: [
//       {
//         id: '1',
//         name: 'Lieblingsplatz',
//         longitude: 4,
//         latitude: 15,
//         category: '',
//         description: 'ruhig und schöne Aussicht',
//       },
//     ],
//   }
//   store.dispatch(getLocationsByUserSuccess(newLocationObj))
//   render(<ProfilePage />)
//   await waitFor(() => screen.getByText('Meine Orte:'))
//   const buttons: Array<HTMLElement> = screen.getAllByRole('button')
//   // click edit of first place
//   fireEvent.click(buttons[0])
//   render(<NewPlacePage match={{ params: { id: ':1' } }} />)

//   const inputName = screen.getByLabelText('Name')
//   fireEvent.change(inputName, { target: { value: 'Mein Lieblingsplatz' } })
//   const inputDescription = screen.getByLabelText('Beschreibung')
//   fireEvent.change(inputDescription, {
//     target: { value: 'ruhig und schöne Aussicht' },
//   })
//   const inputLat = screen.getByLabelText('Breitengrad')
//   fireEvent.change(inputLat, { target: { value: 12 } })
//   const inputLng = screen.getByLabelText('Längengrad')
//   fireEvent.change(inputLng, { target: { value: 47 } })
//   // submit
//   fireEvent.click(screen.getByRole('button', { name: 'Neuen Ort erstellen' }))

//   server.use(
//     // Adds a runtime request handler for posting a new book review.
//     rest.post(
//       'https://roadtripplaner-backend-develop.herokuapp.com/api/v1/user_entries/1',
//       (req, res, ctx) => {
//         // respond using a mocked JSON body
//         return res(
//           ctx.json({
//             data: {
//               type: 'user_entry',
//               userId: 2,
//               attributes: {
//                 public: false,
//                 id: 2,
//                 name: 'Mein Lieblingsort',
//                 description: 'ruhig und schöne Aussicht',
//                 latitude: 12,
//                 longitude: 47,
//                 category: '',
//               },
//             },
//             status: 'Deine neue Location wurde bearbeitet!',
//           })
//         )
//       }
//     )
//   )
//   await waitFor(() => screen.getByText('Deine neue Location wurde bearbeitet'))

//   // simulate edit
//   const editedLocationObj: { locations: LocationState[] | undefined } = {
//     locations: [
//       {
//         id: '1',
//         name: 'Mein Lieblingsplatz',
//         longitude: 4,
//         latitude: 15,
//         category: '',
//         description: 'ruhig und schöne Aussicht',
//       },
//     ],
//   }
//   store.dispatch(getLocationsByUserSuccess(editedLocationObj))

//   // check edited Place  with new neme is in profile
//   const profil = await render(<ProfilePage />)
//   const editedPlace = await waitFor(() =>
//     profil.getByText('Mein Lieblingsplatz')
//   )
//   await expect(editedPlace).toBeTruthy()

//   // check
//   //   await waitFor(() => screen.getByText('Deine neue Location wurde bearbeitet!'))
// })

// Auf Profil klicken
// der bearbeitete Ort da & verändert?
// auf Löschen klicken
// ist er weg?
test('check if place is in profile, click delete, check if it worked', async () => {
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

  render(<ProfilePage />)
  await waitFor(() => screen.getByText('Meine Orte:'))
  const listBefore: HTMLElement = screen.getByRole('list')
  expect(listBefore.childNodes.length === 1).toBe(true)

  const buttons: Array<HTMLElement> = screen.getAllByRole('button')
  // click delete of first place
  fireEvent.click(buttons[1])
  server.use(
    // Adds a runtime request handler for posting a new book review.
    rest.delete(
      'https://roadtripplaner-backend-develop.herokuapp.com/api/v1/user_entries/1',
      (req, res, ctx) => {
        return res(ctx.status(200))
      }
    )
  )
  //simulate delete
  const deletedLocationObj: { locations: LocationState[] | undefined } = {
    locations: [],
  }
  store.dispatch(getLocationsByUserSuccess(deletedLocationObj))

  // check if length is shorter now than before
  const listAfter: HTMLElement = screen.getByRole('list')
  expect(listAfter.childNodes.length === 0).toBe(true)
})
