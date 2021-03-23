import { LocationState, RoadtripState } from '../store/user/types'

export const convertToRoadtrip = (
  roadtripData: Array<Record<string, any>>,
  infoData: { distance?: number; id: number; public: boolean }
) => {
  const locations: LocationState[] = []
  roadtripData.forEach((item) => {
    if (item.attributes.user_entry !== null) {
      locations.push(item.attributes.user_entry)
    } else {
      locations.push(item.attributes.api_entry)
    }
  })
  if (locations.length > 0) {
    const roadtrip: RoadtripState = {
      stops: locations,
      name: locations[0].name + ' - ' + locations[locations.length - 1].name,
      distance: infoData.distance,
      id: infoData.id,
      public: infoData.public,
    }
    return roadtrip
  }
  return []
}
