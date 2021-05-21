import axios from 'axios'

import { userEntry } from '../store/ui/types'
import { RoadtripState } from '../store/user/types'

const fetch = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

export const fetchRoadtrips = (token: string) => {
  return fetch
    .get('roadtrips', {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response.data
    })
}

export type createRoadtripType = {
  data: {
    type: string
    locations: {
      user_entry?: userEntry
      api_entry?: { api_entry_key: string }
    }[]
    attributes: {
      name: string
      public: boolean
      distance: number
    }
  }
}

export const createRoadtrip = (
  roadtripData: createRoadtripType,
  token: string
) => {
  return fetch
    .post('roadtrips', roadtripData, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response.data.data
    })
    .catch((error) => {
      return error.response.data.message
    })
}

export const updateRoadtrip = (roadtrip: RoadtripState, token: string) => {
  const formatedLocations: Array<Record<string, any>> = []
  roadtrip.stops.forEach((stop) => {
    if (stop.api_entry_key) {
      formatedLocations.push({
        user_entry: undefined,
        api_entry: { api_entry_key: stop.api_entry_key },
        order: stop.order,
      })
    } else {
      formatedLocations.push({
        user_entry: {
          public: stop.public,
          name: stop.name,
          description: stop.description,
          latitude: stop.latitude,
          longitude: stop.longitude,
          category: stop.category,
          is_allowed: stop.is_allowed,
          user_id: stop.user_id,
        },
        order: stop.order,
        api_entry: undefined,
      })
    }
  })
  return fetch
    .patch(
      'roadtrips/' + roadtrip.id,
      {
        data: {
          type: 'roadtrip',
          attributes: {
            id: roadtrip.id,
            public: roadtrip.public,
            distance: roadtrip.distance,
            name: roadtrip.name,
          },
          locations: formatedLocations,
        },
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      return response.status
    })
    .catch((error) => {
      return error.response.data.message
    })
}

export const deleteRoadtrip = (token: string, id: string) => {
  return fetch
    .delete('roadtrips/' + id, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response
    })
}
