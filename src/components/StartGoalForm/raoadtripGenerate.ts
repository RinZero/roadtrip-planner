import { userEntry } from '../../store/ui/types'
import { fetchUserEntries } from '../../utils/AuthService'
import { fetchHereData } from '../../utils/fetchHereData'
import { reverseGeocodeHereData } from '../../utils/reverseGeocodeHereData'

type info = {
  address: string
  categories: { id: string; name: string; primary?: boolean }
  coordinates: number[]
  api_key: string
  entry?: userEntry
}

type info2 = {
  address: string
  categories: { id: string; name: string; primary?: boolean }[]
  coordinates: number[]
  api_key: string
  entry?: userEntry
}

export const roadtripGenerate = async (
  stops: number[][],
  maxStops: number,
  categories: string[],
  ownLocations: info2[] | undefined
) => {
  // const center = createCenter(stops[0], stops[stops.length - 1])
  const infoArr: Array<info> = []
  const additionalStops = await getAdditionalPlaces(categories, ownLocations)
  const query =
    '' +
    categories.map((category) => {
      if (category.length === 4) {
        const firstNumber: number = +category[0] * 100
        const category2: string = '' + firstNumber + '-' + category
        return category2
      }
      return category
    })

  const route: number[][] = new Array(maxStops)
  for (let i = 0; i < route.length; i++) {
    if (i < stops.length) {
      const userStop = await reverseGeocodeHereData(stops[i], 'de')
      const userStopInfo = {
        address: userStop.items[0].address.label,
        categories: userStop.items[0].categories,
        coordinates: [
          userStop.items[0].position.lat,
          userStop.items[0].position.lng,
        ],
        api_key: userStop.items[0].id,
      }

      infoArr.push(userStopInfo)
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
      additionalStops.forEach(function (arrayItem: info) {
        possibleStops.items.push(arrayItem)
      })

      if (possibleStops.items.length > 0) {
        const random2 = Math.floor(
          Math.random() * Math.floor(possibleStops.items.length)
        )
        if (possibleStops.items[random2].title) {
          route[i] = [
            possibleStops.items[random2].access[0].lat,
            possibleStops.items[random2].access[0].lng,
            i + 1,
          ]
        } else {
          route[i] = possibleStops.items[random2].coordinates
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
              api_key: possibleStops.items[random2].id,
            }
          : possibleStops.items[random2]

        infoArr.push(obj)
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

    infoArr.sort(
      (a, b) =>
        calcDistance(stops[0], a.coordinates) -
        calcDistance(stops[0], b.coordinates)
    )
    infoArr.sort((a, b) => {
      if (calcDistance(stops[stops.length - 1], a.coordinates) <= 0) {
        return (
          calcDistance(stops[stops.length - 1], b.coordinates) -
          calcDistance(stops[stops.length - 1], a.coordinates)
        )
      }
      return -1
    })
  }

  return {
    coorArr: route.map((data) => data[0].toString() + ',' + data[1].toString()),
    infoArr: infoArr,
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

const getAdditionalPlaces = async (
  possibleCategories: string[],
  ownLocations?: info2[]
) => {
  //call getPlaces for all possible public Places
  const additionalPlaces = await getPlaces(possibleCategories)
  //add all possible own places
  if (ownLocations) {
    for (let i = 0; i < ownLocations.length; i++) {
      ownLocations[i].categories.forEach((item) => {
        if (possibleCategories.includes(item.id)) {
          // only return first Category - idk why
          const obj = {
            address: ownLocations[i].address,
            coordinates: ownLocations[i].coordinates,
            categories: item,
            api_key: ownLocations[i].api_key,
            entry: ownLocations[i].entry,
          }
          additionalPlaces.push(obj)
        }
      })
    }
  }
  return additionalPlaces
}

const getPlaces = async (possibleCategories: string[]) => {
  const places = await fetchUserEntries('')
  const additionalPlaces = new Array<info>()
  for (let i = 0; i < places.length; i++) {
    const categories = places[i].category
      ? await JSON.parse(places[i].category)
      : ''
    if (categories !== '') {
      categories.forEach(function (arrayItem: {
        name: string
        number: string
      }) {
        if (possibleCategories.includes(arrayItem.number)) {
          const userEntry = {
            public: places[i].public,
            name: places[i].name,
            description: places[i].description,
            latitude: places[i].latitude,
            longitude: places[i].longitude,
            category: places[i].category,
            user_id: places[i].user_id,
            is_allowed: places[i].is_allowed,
          }
          const addEntry = {
            address: places[i].name,
            categories: categories,
            coordinates: [places[i].latitude, places[i].longitude],
            api_key: places[i].api_key,
            entry: userEntry,
          }
          additionalPlaces.push(addEntry)
        }
      })
    }
  }
  return additionalPlaces
}
