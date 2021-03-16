/* eslint-disable prettier/prettier */
import axios from 'axios'

export type placeType = {
  type: string
  attributes: {
    public: boolean
    name: string
    description: string
    latitude: number
    longitude: number
    categories: { number: string; name: string }[]
    userID: string
  }
}

const fetch = axios.create({
  baseURL: 'https://roadtripplaner-backend-develop.herokuapp.com/api/v1/',
  // baseURL: 'http://localhost:3000/api/v1/',
})

export const createPlace = (data: placeType, token: string) => {
  return fetch
    .post('user_entries', {
      headers: {
        Authorization: token,
      },
      data,
    })
    .then((response) => {
      // eslint-disable-next-line no-console
      console.log(response.data.data)
      return response.data.data
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error.response)
    })
}
