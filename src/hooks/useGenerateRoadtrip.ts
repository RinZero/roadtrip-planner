import { useSelector } from 'react-redux'

import {
  selectMaxRoadtripStops,
  selectRoadtripStops,
  selectUiSelectedCategories,
} from '../store/selectors'
import { fetchHereData } from '../utils/fetchHereData'

const createCenter = (p0: number[], p1: number[]) => {
  const d = Math.pow(
    Math.pow(p0[0] - p1[0], 2) + Math.pow(p0[1] - p1[1], 2),
    0.5
  )
  const m = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2]

  const u = (p0[0] + p1[0]) / d
  const v = (p0[1] + p1[1]) / d

  const r = d * 1
  const h = Math.pow(Math.pow(r, 2) - Math.pow(d, 2) / 4, 0.5)

  const center1 = [m[0] - h * v, m[1] + h * u]
  const center2 = [m[0] + h * v, m[1] - h * u]

  return center1
}

export const useRoadtripGenerate = async () => {
  const stops = useSelector(selectRoadtripStops())
  const maxStops = useSelector(selectMaxRoadtripStops())
  const categories = useSelector(selectUiSelectedCategories())

  // const center = createCenter(stops[0], stops[stops.length - 1])

  const query = '' + categories.map((category) => category)
  const limit = maxStops

  const route: number[][] = new Array(maxStops)

  // eslint-disable-next-line no-console
  console.log(route)
  for (let i = 0; i < route.length; i++) {
    if (i < stops.length) {
      route[i] = stops[i]
    } else {
      const random1 = Math.floor(Math.random() * Math.floor(stops.length))
      const center = stops[random1]
      const possibleStops = await fetchHereData({
        object: { endpoint: 'browse', query: query },
        at: { longitude: center[0], latitude: center[1] },
        language: 'de',
        limit: 100,
        route: {
          stopps: stops,
          width: 40000,
        },
      })
      if (possibleStops.items.length > 0) {
        const random2 = Math.floor(
          Math.random() * Math.floor(possibleStops.items.length)
        )
        // eslint-disable-next-line no-console
        console.log('random', random2)
        route[i] = [
          possibleStops.items[random2].access[0].lat,
          possibleStops.items[random2].access[0].lng,
          i + 1,
        ]
      }
      // eslint-disable-next-line no-console
      console.log(route)
    }

    route.sort((a, b) => calcDistance(stops[0], a) - calcDistance(stops[0], b))
    route.sort((a, b) => {
      if (calcDistance(stops[stops.length - 1], a) <= 0) {
        return (
          calcDistance(stops[stops.length - 1], b) -
          calcDistance(stops[stops.length - 1], a)
        )
      }
      return -1
    })

    // eslint-disable-next-line no-console
    console.log(route)
  }
  return route
}

const calcDistance = (p1: number[], p2: number[]) => {
  const lat1 = p1[0]
  const lon1 = p1[1]
  const lat2 = p2[0]
  const lon2 = p2[1]
  if (lat1 === lat2 && lon1 === lon2) {
    return 0
  } else {
    const radlat1 = (Math.PI * lat1) / 180
    const radlat2 = (Math.PI * lat2) / 180
    const theta = lon1 - lon2
    const radtheta = (Math.PI * theta) / 180
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    if (dist > 1) {
      dist = 1
    }
    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    return dist
  }
}

const createRoute = () => {
  return []
}
