import React, { useState } from 'react'

export const CreateUser = async () => {
  //dieser User könnte oben auch als Parameter mitgegeben werden
  const user = {
    data: {
      type: 'user',
      attributes: {
        username: 'frontendPerson',
        email: 'frontend50@per.son',
        password: 'css123',
        password_confirmation: 'css123',
        is_admin: false,
        picture: '',
      },
    },
  }

  const response = await fetch(
    'https://roadtripplaner-backend-develop.herokuapp.com/api/v1/users',
    // 'http://localhost:3000/api/v1/users',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }
  )

  const t = await { type: 'createUser/success', result: { response } }
  // eslint-disable-next-line no-console
  console.log(t)

  if (response.ok) {
    // console.log('Acount created.')
  } else {
    // console.log('Wrong input.')
  }
}
