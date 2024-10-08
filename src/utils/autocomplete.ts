import { LocationState } from '../store/user/types'

export const autocomplete = async (
  place: string,
  locations: LocationState[]
) => {
  const additionalData = checkPlaces(place, locations)
  const url = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json&country=AUT?apiKey=${process.env.REACT_APP_HERE_API_KEY}&query=${place}`
  const response = await fetch(url)
  const data = await response.json()
  if (!data.suggestions) {
    return data
  }
  const result = getOnlyImportantInfo(data.suggestions)
  additionalData.forEach((additionalSuggesion) =>
    result.add(additionalSuggesion.name)
  )
  return result
}

// only want to get the name of the options from autocomplete places
// and check if nothing is in there more than once
const getOnlyImportantInfo = (
  suggestions: { [key: string]: string | any }[]
) => {
  const newSet = new Set<string>()
  suggestions.forEach(function (place) {
    const strArr = place.label.split(', ')
    // Remove the first item of an array because it is 'Österreich'
    if (strArr.length > 1) {
      strArr.shift()
      const placeName =
        strArr[0] === strArr[1] ? strArr[0] : strArr.slice(0, 2).join(', ')
      newSet.add(placeName)
    }
  })
  return newSet
}

const getCoordinates = async (loactaionId: string) => {
  const searchName = 'Austria+' + loactaionId.replace(', ', '+')
  const url = `https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=${process.env.REACT_APP_HERE_API_KEY}&searchtext=${searchName}`
  const response = await fetch(url)
  const data = await response.json()
  if (data.Response.View[0]) return data.Response.View[0].Result[0]
  else return undefined
}

export const iterateStops = async (
  stops: string[],
  locations: LocationState[]
) => {
  const newArr = new Array<number[]>()
  let j = 0
  for (let i = 0; i < stops.length; i++) {
    if (stops[i] && stops[i] !== '') {
      const data = await getCoordinates(stops[i])

      if (data) {
        // Wenn Ort nicht existiert bzw. nicht in Österreich liegt blödsinn zurückgeben, um User darauf hinzuweisen
        if (
          data.Location.Address.Country &&
          data.Location.Address.Country !== 'AUT'
        ) {
          const getLatLon = await findLocation(stops[i], locations)
          if (getLatLon) newArr[j] = getLatLon
          else return [[-1, -1]]
        }

        const lat = data.Location.DisplayPosition.Latitude
        const lon = data.Location.DisplayPosition.Longitude
        newArr[j] = [lat, lon]
      } else {
        const getLatLon = await findLocation(stops[i], locations)
        if (getLatLon) newArr[j] = getLatLon
      }
      j++
    }
  }
  return newArr
}

// find public or own Place by name
export const findLocation = async (
  name: string,
  allPlaces: LocationState[]
) => {
  const result = await getResult(name, allPlaces)
  return result
}

async function getResult(name: string, allPlaces: LocationState[]) {
  for (const place of allPlaces) {
    if (place.name === name) {
      if (place.latitude && place.longitude) {
        const coordinates = [place.latitude, place.longitude]
        return coordinates
      }
    }
  }
}

// simple autocomplete check for public and own locations
const checkPlaces = (
  inputLetters: string,
  locations: Array<Record<string, any>>
) => {
  const placesArr = new Array<Record<string, any>>()
  locations.forEach(function (item) {
    const name = item.name.toLowerCase()
    if (name.includes(inputLetters.toLowerCase())) placesArr.push(item)
  })
  return placesArr
}
