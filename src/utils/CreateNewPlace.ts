import { LocationSearching } from '@material-ui/icons'
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

export const deletePlace = (token: string, id: string) => {
  return fetch
    .delete(`user_entries/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response
    })
}
