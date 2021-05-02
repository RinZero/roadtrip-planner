import axios from 'axios'

export type placeType = {
  type: string
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

export const createPlace = (data: placeType, token: string) => {
  return fetch
    .post(
      'user_entries',
      {
        data,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      return response.data
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
      return response.data
    })
    .catch((error) => {
      return Object.entries(error.response.data)
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
