import React, { useState } from 'react'

import ReactDOM from 'react-dom'

export type FetchUserType = {
  email: string
  password: string
  passwordConfimation: string
}
export const FetchUser = async (logInUser: FetchUserType) => {
  const url =
    'https://roadtripplaner-backend-develop.herokuapp.com/api/v1/sessions'
  // 'http://localhost:3000/api/v1/users'; test
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(logInUser),
  })

  const data = await response.json()
  const token = data.jwt
  localStorage.setItem('token', token)

  localStorage.setItem('userID', data.id)
}
