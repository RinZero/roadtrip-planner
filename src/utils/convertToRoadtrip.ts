import { LocationState, RoadtripState } from '../store/user/types'

export const convertToRoadtrip = (
  roadtripData: Array<Record<string, any>>,
  infoData: {
    distance?: number
    id: number
    public: boolean
    name: string
    stops: Array<Record<string, any>>
  }
) => {
  const locations: LocationState[] = []
  roadtripData.forEach((item, index) => {
    if (item.attributes.user_entry !== null) {
      locations.push({
        ...item.attributes.user_entry,
        order: infoData.stops[index].order,
      })
    } else {
      locations.push({
        ...item.attributes.api_entry,
        order: infoData.stops[index].order,
      })
    }
  })

  if (locations.length > 0) {
    const roadtrip: RoadtripState = {
      stops: locations.sort((a, b) => a.order - b.order),
      name:
        infoData.name ||
        locations[0].name + ' - ' + locations[locations.length - 1].name,
      distance: infoData.distance,
      id: infoData.id,
      public: infoData.public,
    }
    return roadtrip
  }
  return []
}
