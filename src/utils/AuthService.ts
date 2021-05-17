import axios from 'axios'

import { userEntry } from '../store/ui/types'
import { RoadtripState } from '../store/user/types'

export type logInType = {
  email: string
  password: string
  password_confirmation: string
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
  baseURL: process.env.REACT_APP_BASE_URL,
})

export const logIn = (logInData: logInType) => {
  return fetch
    .post('sessions', logInData)
    .then((response) => {
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
    })
    .catch((error) => {
      return error.response.data.error
    })
}

export const signUp = (signUpData: FormData) => {
  return fetch
    .post('users', signUpData)
    .then((response) => {
      return { status: response.status, data: response.data.data.attributes }
    })
    .catch((error) => {
      return { status: '400', data: Object.entries(error.response.data) }
    })
}

export const createRoadtrip = (
  roadtripData: createRoadtripType,
  token: string
) => {
  return fetch
    .post('roadtrips', roadtripData, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response.data.data
    })
    .catch((error) => {
      return error.response.data.message
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
      return response.data
    })
}

export const updateRoadtrip = (roadtrip: RoadtripState, token: string) => {
  const formatedLocations: Array<Record<string, any>> = []
  roadtrip.stops.forEach((stop) => {
    if (stop.api_entry_key) {
      formatedLocations.push({
        user_entry: undefined,
        api_entry: { api_entry_key: stop.api_entry_key },
        order: stop.order,
      })
    } else {
      formatedLocations.push({
        user_entry: {
          public: stop.public,
          name: stop.name,
          description: stop.description,
          latitude: stop.latitude,
          longitude: stop.longitude,
          category: stop.category,
          is_allowed: stop.is_allowed,
          user_id: stop.user_id,
        },
        order: stop.order,
        api_entry: undefined,
      })
    }
  })
  return fetch
    .patch(
      'roadtrips/' + roadtrip.id,
      {
        data: {
          type: 'roadtrip',
          attributes: {
            id: roadtrip.id,
            public: roadtrip.public,
            distance: roadtrip.distance,
            name: roadtrip.name,
          },
          locations: formatedLocations,
        },
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      return response.status
    })
    .catch((error) => {
      return error.response.data.message
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
      return response.data
    })
}

export const deleteRoadtrip = (token: string, id: string) => {
  return fetch
    .delete('roadtrips/' + id, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response
    })
}

export const editUser = (data: FormData, token: string, id: string) => {
  return fetch
    .patch(`users/${id}`, data, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return {
        status: error.response.status,
        data: Object.entries(error.response.data),
      }
    })
}

export const editUserPassword = (data: FormData, token: string, id: string) => {
  return fetch
    .patch(`users/${id}`, data, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return {
        status: error.response.status,
        data: Object.entries(error.response.data),
      }
    })
}

export const deleteUser = (token: string, id: string) => {
  return fetch
    .delete(`users/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response
    })
}
