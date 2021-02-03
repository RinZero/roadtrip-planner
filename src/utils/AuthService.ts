import axios from 'axios'

const API_URL = 'https://roadtripplaner-backend-develop.herokuapp.com/api/v1/'

export type logInType = {
  email: string
  password: string
  password_confirmation: string
}

export type signUpType = {
  username: string
  email: string
  password: string
  password_confirmation: string
  is_admin: boolean
  picture?: string
}

export const logIn = (logInData: logInType) => {
  return axios.post(API_URL + 'sessions', logInData).then((response) => {
    // eslint-disable-next-line no-console
    console.log(response.data)
  })
}

export const signUp = (signUpData: signUpType) => {
  return axios.post(API_URL + 'users', signUpData).then((response) => {
    // eslint-disable-next-line no-console
    console.log(response.data)
  })
}
