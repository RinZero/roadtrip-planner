/* eslint-disable prettier/prettier */
export const autocomplete = async (place: string) => {
  const apiKey = 'E2lDYLhdeOT8rv2atmJ78m7_jafCkXg3NmgSAwjpcdE'
  const url = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json&country=AUT?apiKey=${apiKey}&query=${place}`
  const response = await fetch(url)
  const data = await response.json()
  if (!data.suggestions) {
    return data
  }
  const result = getOnlyImportantInfo(data.suggestions)
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
    const n = strArr.length > 2 ? 2 : 3
    if (strArr[1] !== strArr[2]) {
      const placeName = strArr.slice(1, n).join(', ')
      newSet.add(placeName)
    }
  })
  return newSet
}

const getCoordinates = async (loactaionId: string) => {
  const apiKey = 'E2lDYLhdeOT8rv2atmJ78m7_jafCkXg3NmgSAwjpcdE'
  const searchName = loactaionId.replace(', ', '+')
  const url = `https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=${apiKey}&searchtext=${searchName}`
  const response = await fetch(url)
  const data = await response.json()
  return data.Response.View[0].Result[0]
}

export const iterateStops = async (stops: string[]) => {
  const newArr = new Array<number[]>()
  let j = 0

  stops.forEach(async function (stop: string) {
    const data = await getCoordinates(stop)
    const lat: number = data.Location.DisplayPosition.Latitude
    const lon: number = data.Location.DisplayPosition.Longitude
    newArr[j] = [lat, lon]
    j++
  })

  return newArr
}
