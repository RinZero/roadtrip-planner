import axios from 'axios'

import { encode1 } from './flexible-polyline'
// export type HereApiDiscover = {
//   endpoint: 'discover'
//   query?: string
// }

export type HereApiBrowse = {
  endpoint: 'browse'
  categories?: string
  name?: string
  query?: string
}

export type HereApiParams = {
  object: HereApiBrowse
  at: { longitude: number; latitude: number }
  limit: number
  language?: string
  show?: string[]
  route?: { stopps: number[][]; width?: number }
  //TODO: add route param
}

export const fetchHereData = async (props: HereApiParams) => {
  const { object, at, limit, language, show, route } = props
  const polyline = encode1({ polyline: route?.stopps })
  const url =
    'https://' +
    object.endpoint +
    '.search.hereapi.com/v1/' +
    object.endpoint +
    '?at=' +
    at.longitude.toString() +
    ',' +
    at.latitude.toString() +
    '&limit=' +
    limit.toString() +
    '&lang=' +
    language +
    '&apiKey=' +
    process.env.REACT_APP_HERE_API_KEY +
    '&route=' +
    polyline +
    ';w=' +
    route?.width +
    '&categories=' +
    object.query
  //'https://discover.search.hereapi.com/v1/discover?at=52.8173086,12.2368342&limit=5&lang=en&q=Obi+Hamburg&apiKey={process.env.REACT_APP_HERE_API_KEY}'
  // https://browse.search.hereapi.com/v1/browse
  return axios.get(url).then((response) => {
    return response.data
  })
}
