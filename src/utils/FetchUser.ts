import React, { useState } from 'react'
import ReactDOM from 'react-dom'

export const FetchUser = async () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [person, setPerson] = useState(null)

  const url =
    'https://roadtripplaner-backend-develop.herokuapp.com/api/v1/users'
  // 'http://localhost:3000/api/v1/users';
  const response = await fetch(url)
  const data = await response.json()

  if (loading) {
    setLoading(false)
    setPerson(data.data[0])
    console.log(data)
    console.log(data.data[0])
  }
}
