/* eslint-disable prettier/prettier */
import axios from 'axios'
const fetch = axios.create({
  // baseURL: 'http://localhost:3000/api/v1/',
  baseURL: 'https://roadtripplaner-backend-develop.herokuapp.com/api/v1/',
})
export const fetchPublicPlaces = () => {
  return fetch.get('user_entries').then((response) => {
    // eslint-disable-next-line no-console
    console.log(response.data)
    return response.data
  })
}
