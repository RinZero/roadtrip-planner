/* eslint-disable prettier/prettier */

import { Place } from '@material-ui/icons'

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

const getOnlyImportantInfo = (suggestions: any[]) => {
  // eslint-disable-next-line no-console
  console.log(suggestions)
  const newSet = new Set<string>()
  // district is key so there are no places more than once
  suggestions.forEach(function (place) {
    const str = place.label.split(', ')
    const placeName = str.slice(1, 2).join(', ')
    newSet.add(placeName)
  })
  // eslint-disable-next-line no-console
  console.log(newSet)
  return newSet
}

const getCoordinates = async (loactaionId: string) => {
  const apiKey = 'E2lDYLhdeOT8rv2atmJ78m7_jafCkXg3NmgSAwjpcdE'
  const t = loactaionId.replace(', ', '+')
  const url = `https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=${apiKey}&searchtext=${t}`
  // const url = `https://geocoder.ls.hereapi.com/6.2/geocode.json?locationid=${loactaionId}&jsonattributes=1&gen=9&apiKey=${apiKey}`
  const response = await fetch(url)
  const data = await response.json()
  return data
}

export const iterateStops = async (stops: any) => {
  const newArr = []
  let j = 0
  for (let i = 0; i < stops.length; i++) {
    if (stops[i] && stops[i] !== '') {
      const data = await getCoordinates(stops[i])
      const lat =
        data.Response.View[0].Result[0].Location.DisplayPosition.Latitude
      const lon =
        data.Response.View[0].Result[0].Location.DisplayPosition.Longitude
      newArr[j] = [lat, lon]
      j++
    }
  }
  return newArr
}
