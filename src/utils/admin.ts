import axios from 'axios'
const fetch = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})
export const fetchUser = (token: string) => {
  return fetch
    .get('users', {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error.response.data
    })
}

export const adminEditUser = (token: string, id: number) => {
  return fetch
    .patch(
      `users/${id}`,
      {
        data: { id: id },
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
      return error
    })
}

export const adminEditPlace = (token: string, id: number) => {
  return fetch
    .patch(
      `user_entries/${id}`,
      {
        data: {
          type: 'user_entry',
          id: id,
        },
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
