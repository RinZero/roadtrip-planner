import axios from 'axios'

import { LocationState } from '../store/user/types'

export type placeType = {
  type: string
  userId: string
  attributes: {
    public: boolean
    name: string
    description: string
    latitude: number | null
    longitude: number | null
    category: string
    id?: number
  }
}

const fetch = axios.create({
  baseURL: 'https://roadtripplaner-backend-develop.herokuapp.com/api/v1/',
  // baseURL: 'http://localhost:3000/api/v1/',
})

export const createPlace = (data: placeType) => {
  return fetch
    .post('user_entries', {
      data,
    })
    .then((response) => {
      return response.data.status
    })
    .catch((error) => {
      return Object.entries(error.response.data)
    })
}

export const editPlace = (data: placeType, id: string, token: string) => {
  return fetch
    .patch(
      `user_entries/${id}`,
      {
        data: data,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      return response.data.status
    })
    .catch((error) => {
      return [error]
    })
}

export const findLocationById = (id: string, locations: LocationState[]) => {
  if (locations) {
    for (let i = 0; i < locations.length; i++) {
      if (locations[i].id === id) {
        const obj = {
          public: locations[i].public,
          name: locations[i].name,
          description: locations[i].description,
          latitude: locations[i].latitude,
          longitude: locations[i].longitude,
          category: locations[i].category,
        }
        return obj
      }
    }
  }
  return undefined
}
