import axios from 'axios'
const fetch = axios.create({
  // baseURL: 'http://localhost:3000/api/v1/',
  baseURL: 'https://roadtripplaner-backend-develop.herokuapp.com/api/v1/',
})
export const fetchPublicPlaces = () => {
  return fetch.get('user_entries').then((response) => {
    return response.data
  })
}
