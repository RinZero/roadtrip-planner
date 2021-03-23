import { fetchPublicPlaces } from './getPublicPlaces'

export const autocomplete = async (place: string, userLocations?: any[]) => {
  // get public locations
  const publicLocations = await fetchPublicPlaces()
  // all locations
  const locations = userLocations
    ? userLocations.concat(publicLocations)
    : publicLocations
  const additionalData = checkPlaces(place, locations)
  const apiKey = 'E2lDYLhdeOT8rv2atmJ78m7_jafCkXg3NmgSAwjpcdE'
  const url = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json&country=AUT?apiKey=${apiKey}&query=${place}`
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
    strArr.shift()
    const placeName =
      strArr[0] === strArr[1] ? strArr[0] : strArr.slice(0, 2).join(', ')
    newSet.add(placeName)
  })
  return newSet
}

const getCoordinates = async (loactaionId: string) => {
  const apiKey = 'E2lDYLhdeOT8rv2atmJ78m7_jafCkXg3NmgSAwjpcdE'
  const searchName = loactaionId.replace(', ', '+')
  const url = `https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=${apiKey}&searchtext=${searchName}`
  const response = await fetch(url)
  const data = await response.json()
  if (data.Response.View[0]) return data.Response.View[0].Result[0]
  else return undefined
}

export const iterateStops = async (stops: string[], userLocations?: any[]) => {
  const newArr = new Array<number[]>()
  let j = 0
  for (let i = 0; i < stops.length; i++) {
    if (stops[i] && stops[i] !== '') {
      const data = await getCoordinates(stops[i])
      if (data) {
        const lat = data.Location.DisplayPosition.Latitude
        const lon = data.Location.DisplayPosition.Longitude
        newArr[j] = [lat, lon]
      } else {
        const publicPlaces = await fetchPublicPlaces()

        const getLatLon = await findLocation(
          stops[i],
          userLocations,
          publicPlaces
        )
        if (getLatLon) newArr[j] = getLatLon
      }
      j++
    }
  }
  // eslint-disable-next-line no-console
  console.log(newArr)
  return newArr
}

// find public or own Place by name
export const findLocation = async (
  name: string,
  userLocations?: any,
  publicPlaces?: any
) => {
  const allPlaces = userLocations
    ? userLocations.concat(publicPlaces)
    : publicPlaces

  const result = await getResult(name, allPlaces)
  return result
}

async function getResult(name: string, allPlaces: any) {
  for (const place of allPlaces) {
    // eslint-disable-next-line no-console
    if (place.name === name) {
      const coordinates = [place.latitude, place.longitude]
      return coordinates
    }
  }
}

// simple autocomplete check for public and own locations
const checkPlaces = (inputLetters: string, locations: any[]) => {
  const placesArr = new Array<any>()
  locations.forEach(function (item) {
    const name = item.name.toLowerCase()
    if (name.includes(inputLetters)) placesArr.push(item)
  })
  return placesArr
}
