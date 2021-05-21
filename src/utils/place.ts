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
  baseURL: process.env.REACT_APP_BASE_URL,
})

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
