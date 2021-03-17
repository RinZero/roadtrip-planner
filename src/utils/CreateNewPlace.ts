/* eslint-disable prettier/prettier */
import axios from 'axios'

export type placeType = {
  type: string
  userId: string
  attributes: {
    public: boolean
    name: string
    description: string
    latitude: number
    longitude: number
    category: string
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
      return response.data.data
    })
}
