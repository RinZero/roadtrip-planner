import axios from 'axios'

import { userEntry } from '../store/ui/types'

export type placeType = {
  type: string
  userId: string
  attributes: userEntry
}

const fetch = axios.create({
  //baseURL: 'https://roadtripplaner-backend-develop.herokuapp.com/api/v1/',
  baseURL: 'http://localhost:3000/api/v1/',
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
