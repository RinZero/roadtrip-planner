import axios from 'axios'

export const reverseLookupHereData = (id: string) => {
  const url =
    'https://lookup.search.hereapi.com/v1/lookup?id=' +
    id +
    '&apiKey=' +
    process.env.REACT_APP_HERE_API_KEY
  return axios.get(url).then((response) => {
    return response.data
  })
}
