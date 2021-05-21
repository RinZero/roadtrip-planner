import axios from 'axios'

export type logInType = {
  email: string
  password: string
  password_confirmation: string
}

const fetch = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

export const logIn = (logInData: logInType) => {
  return fetch
    .post('sessions', logInData)
    .then((response) => {
      const id = response.data.user.id
      const { email, username, is_admin, image } = response.data.user.attributes
      const jwtToken = response.data.token
      return {
        userName: username,
        id: id,
        email: email,
        isAdmin: is_admin,
        picture: image?.url,
        token: jwtToken,
      }
    })
    .catch((error) => {
      return error.response.data.error
    })
}

export const signUp = (signUpData: FormData) => {
  return fetch
    .post('users', signUpData)
    .then((response) => {
      return { status: response.status, data: response.data.data.attributes }
    })
    .catch((error) => {
      return { status: '400', data: Object.entries(error.response.data) }
    })
}

//unused for now
export const logOut = (id: string) => {
  return fetch.delete('sessions/' + id).then((response) => {
    if (response.data.errors) {
      // eslint-disable-next-line no-console
      console.log(response.data.errors)
    }
  })
}
