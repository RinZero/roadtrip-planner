import axios from 'axios'

import { userEntry } from '../store/ui/types'

export type logInType = {
  email: string
  password: string
  password_confirmation: string
}

export type signUpType = {
  data: {
    type: string
    attributes: {
      username: string
      email: string
      password: string
      password_confirmation: string
      is_admin?: boolean
      picture?: string
    }
  }
}

export type createRoadtripType = {
  data: {
    type: string
    locations: {
      user_entry?: userEntry
      api_entry?: { api_entry_key: string }
    }[]
    attributes: {
      name: string
      public: boolean
      distance: number
    }
  }
}
const fetch = axios.create({
  baseURL: 'https://roadtripplaner-backend-develop.herokuapp.com/api/v1/',
  // baseURL: 'http://localhost:3000/api/v1/',
})

export const logIn = (logInData: logInType) => {
  return fetch.post('sessions', logInData).then((response) => {
    if (response.data.status === 'unprocessable_entity') {
      // eslint-disable-next-line no-console
      console.log(response.data.errors)
    } else {
      // eslint-disable-next-line no-console
      console.log(response)
      const { id, email, username, is_admin, picture } = response.data.user
      const jwtToken = response.data.token
      return {
        userName: username,
        id: id,
        email: email,
        isAdmin: is_admin,
        picture: picture,
        token: jwtToken,
      }
    }
  })
}

export const signUp = (signUpData: signUpType) => {
  // eslint-disable-next-line no-console
  console.log(signUpData)
  return fetch.post('users', signUpData).then((response) => {
    return response.data.data
  })
}

export const createRoadtrip = (
  roadtripData: createRoadtripType,
  token: string
) => {
  // eslint-disable-next-line no-console
  console.log(roadtripData)
  return fetch
    .post('roadtrips', roadtripData, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response.data.data
    })
}

//unused for now
export const logOut = (id: string) => {
  return fetch.delete('sessions/' + id).then((response) => {
    if (response.data.errors) {
      // eslint-disable-next-line no-console
      console.log(response.data.errors)
    }
  })
}

export const fetchRoadtrips = (token: string) => {
  return fetch
    .get('roadtrips', {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      // eslint-disable-next-line no-console
      console.log(response.data)
      return response.data
    })
}

export const fetchUserEntries = (token: string) => {
  return fetch
    .get('user_entries', {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      // eslint-disable-next-line no-console
      console.log(response.data.data)
      return response.data.data
    })
}
