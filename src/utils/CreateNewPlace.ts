import axios from 'axios'

export type placeType = {
  type: string
  userId: string
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
  // baseURL: 'https://roadtripplaner-backend-develop.herokuapp.com/api/v1/',
  baseURL: 'http://localhost:3000/api/v1/',
})

export const createPlace = (data: placeType) => {
  return fetch
    .post('user_entries', {
      data,
    })
    .then((response) => {
      return response.data.status
    })
    .catch((error) => {
      return Object.entries(error.response.data)
    })
}

export const editPlace = (data: placeType, id: string, token: string) => {
  // eslint-disable-next-line no-console
  console.log(data)
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
      // eslint-disable-next-line no-console
      console.log(response)
      return response.data.status
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error)
      return Object.entries(error.response.data)
    })
}

export const findLocationById = (
  id: string,
  locations: any[],
  userID: string
) => {
  if (locations) {
    for (let i = 0; i < locations.length; i++) {
      if (locations[i].id === id) {
        const obj = {
          type: 'user_entries',
          userId: userID,
          attributes: {
            public: locations[i].public,
            name: locations[i].name,
            description: locations[i].description,
            latitude: locations[i].latitude,
            longitude: locations[i].longitude,
            category: locations[i].category,
            id: locations[i].id,
          },
        }
        return obj
      }
    }
  }
  return undefined
}
