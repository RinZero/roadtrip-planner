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

  const center = createCenter(stops[0], stops[stops.length - 1])

  let i = 0
  for (const stop of stops) {
    stop.push(i)
    i++
  }

  const query = '' + categories.map((category) => category + ', ')

  const places = await fetchHereData({
    object: { endpoint: 'discover', query: query },
    at: { longitude: center[0], latitude: center[1] },
    limit: maxStops - stops.length + 2,
    language: 'de',
    route: {
      stopps: stops,
      width: 20000,
    },
  })

  // eslint-disable-next-line no-console
  console.log(places)
}

const createRoute = () => {
  return []
}
