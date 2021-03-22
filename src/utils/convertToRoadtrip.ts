import { LocationState, RoadtripState } from '../store/user/types'

export const convertToRoadtrip = (data: Array<unknown>) => {
  const locations: LocationState[] = []
  data.forEach((item: any) => {
    if (item.attributes.user_entry !== null) {
      locations.push(item.attributes.user_entry)
    } else {
      locations.push(item.attributes.api_entry)
    }
  })
  const roadtrip: RoadtripState = {
    stops: locations,
    name: locations[0].name + ' - ' + locations[locations.length - 1].name,
    distance: 0,
  }
  return roadtrip
}
