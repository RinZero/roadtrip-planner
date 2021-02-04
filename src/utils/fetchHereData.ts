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
    '&apiKey=E2lDYLhdeOT8rv2atmJ78m7_jafCkXg3NmgSAwjpcdE' +
    '&route=' +
    polyline +
    ';w=' +
    route?.width +
    '&categories=' +
    object.query
  //'https://discover.search.hereapi.com/v1/discover?at=52.8173086,12.2368342&limit=5&lang=en&q=Obi+Hamburg&apiKey=E2lDYLhdeOT8rv2atmJ78m7_jafCkXg3NmgSAwjpcdE'
  // https://browse.search.hereapi.com/v1/browse
  // eslint-disable-next-line no-console
  console.log(url)
  const response = await fetch(url)
  const data = await response.json()
  // eslint-disable-next-line no-console
  console.log(data)
  return data
}
