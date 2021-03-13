/* eslint-disable prettier/prettier */
import axios from 'axios'

export type locationType = {
  type: string
  attributes: { is_api_entry: boolean }
}

export type placeType = {
  data: {
    type: string
    attributes: {
      public: boolean
      is_allowed?: boolean
      name: string
      description: string
      latitude: number
      longitude: number
      user?: any
      location?: locationType
    }
  }
}

const fetch = axios.create({
  // baseURL: 'localhost:3000/api/v1/',
  baseURL: 'http://localhost:3000/api/v1/',
})

export const createLocation = (data: locationType, token: string) => {
  return fetch
    .post('locations', {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      data,
    })
    .then((response) => {
      // eslint-disable-next-line no-console
      console.log(response)
      return response.data.data
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error.response)
    })
}

export const createPlace = (newPlaceData: placeType, token: string) => {
  return fetch
    .post('user_entries', {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      newPlaceData,
    })
    .then((response) => {
      // eslint-disable-next-line no-console
      console.log(response)
      return response.data.data
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error.response)
    })
}
