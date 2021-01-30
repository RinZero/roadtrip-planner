import React, { useState } from 'react'

export const CreateUser = async () => {
  //dieser User könnte oben auch als Parameter mitgegeben werden
  const user = {
    type: 'user',
    id: '5',
    //   attributes: { username: 'frontendPerson', email: 'frontend@per.son', password: 'css', is_admin: false }
    attributes: { is_admin: false, username: 'frontendPerson' },
  }

  console.log(user)

  const response = await fetch(
    'https://roadtripplaner-backend-develop.herokuapp.com/api/v1/users',
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
  console.log(response)
  console.log(t)
  if (response.ok) {
    console.log('Acount created.')
  } else {
    console.log('Wrong input.')
  }
}
