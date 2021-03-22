import { fetchHereData } from '../../utils/fetchHereData'

type info = {
  address: string
  categories: { id: string; name: string; primary?: boolean }
  coordinates: number[]
}

export const roadtripGenerate = async (
  stops: number[][],
  maxStops: number,
  categories: string[]
) => {
  // const center = createCenter(stops[0], stops[stops.length - 1])

  const query = '' + categories.map((category) => category)

  const list = new Set<info>()
  const route: number[][] = new Array(maxStops)
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
        route[i] = [
          possibleStops.items[random2].access[0].lat,
          possibleStops.items[random2].access[0].lng,
          i + 1,
        ]
        const obj = {
          address: possibleStops.items[random2].address.label,
          categories: possibleStops.items[random2].categories,
          coordinates: [
            possibleStops.items[random2].position.lat,
            possibleStops.items[random2].position.lng,
          ],
        }
        list.add(obj)
      }
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
  }
  return {
    coorArr: route.map((data) => data[0].toString() + ',' + data[1].toString()),
    infoArr: Array.from(list),
  }
}

export const calcDistance = (p1: number[], p2: number[]) => {
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
