import axios from 'axios'

const fetch = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

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
