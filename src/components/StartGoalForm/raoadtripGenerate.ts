/* eslint-disable prettier/prettier */
import { fetchPlaces } from '../../utils/AuthService'
import { fetchHereData } from '../../utils/fetchHereData'

type info = {
  address: string
  categories: { id: string; name: string; primary?: boolean }
  coordinates: number[]
}

export const roadtripGenerate = async (
  stops: number[][],
  maxStops: number,
  categories: string[],
  token: string
) => {
  // const center = createCenter(stops[0], stops[stops.length - 1])

  // eslint-disable-next-line no-console
  const additionalStops = await getPlaces(token, categories)

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

      // add own and/or public user_entries to possible stops
      additionalStops.forEach(function (arrayItem: any) {
        possibleStops.items.push(arrayItem)
      })

      if (possibleStops.items.length > 0) {
        const random2 = Math.floor(
          Math.random() * Math.floor(possibleStops.items.length)
        )
        // check if UserEntry oder from HERE
        if (possibleStops.items[random2].title) {
          route[i] = [
            possibleStops.items[random2].access[0].lat,
            possibleStops.items[random2].access[0].lng,
            i + 1,
          ]
        } else {
          route[i] = [possibleStops.items[random2].coordinates, i + 1]
        }
        // check if obj UserEntry or from HERE
        const obj = possibleStops.items[random2].title
          ? {
              address: possibleStops.items[random2].address.label,
              categories: possibleStops.items[random2].categories,
              coordinates: [
                possibleStops.items[random2].position.lat,
                possibleStops.items[random2].position.lng,
              ],
            }
          : possibleStops.items[random2]
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

const getPlaces = async (token: string, possibleCategories: string[]) => {
  const places = await fetchPlaces(token)
  const additionalPlaces = new Array<info>()
  for (let i = 0; i < places.length; i++) {
    const categories = JSON.parse(places[i].category)
    categories.forEach(function (arrayItem: { name: string; number: string }) {
      if (possibleCategories.includes(arrayItem.number)) {
        const addEntry = {
          address: places[i].name,
          categories: categories,
          coordinates: [places[i].latitude, places[i].longitude],
        }
        additionalPlaces.push(addEntry)
      }
    })
  }

  return additionalPlaces
}
