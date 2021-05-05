import axios from 'axios'

export const reverseGeocodeHereData = (
  coordinates: number[],
  language: string
) => {
  const url =
    'https://revgeocode.search.hereapi.com/v1/revgeocode?at=' +
    coordinates[0] +
    ',' +
    coordinates[1] +
    '&lang=' +
    language +
    '&apiKey=' +
    process.env.REACT_APP_HERE_API_KEY
  return axios.get(url).then((response) => {
    return response.data
  })
}
