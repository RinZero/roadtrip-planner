import axios from 'axios'

export const reverseLookupHereData = (id: string) => {
  const url =
    'https://lookup.search.hereapi.com/v1/lookup?id=' +
    id +
    '&apiKey=E2lDYLhdeOT8rv2atmJ78m7_jafCkXg3NmgSAwjpcdE'
  return axios.get(url).then((response) => {
    return response.data
  })
}
