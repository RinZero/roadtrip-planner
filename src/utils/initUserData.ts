import { Dispatch } from 'redux'

import {
  getRoadtripsByUserSuccess,
  getLocationsByUserSuccess,
} from '../store/actions'
import { LocationState } from '../store/user/types'
import { fetchRoadtrips, fetchUserEntries } from './AuthService'
import { convertToRoadtrip } from './convertToRoadtrip'

export const initUserData = async (token: string, dispatch: Dispatch<any>) => {
  const roadtripsRaw = await fetchRoadtrips(token)

  const roadtrips = await roadtripsRaw.roadtrips.map(
    (
      raw: {
        data: Array<Record<string, any>>
      },
      index: number
    ) => convertToRoadtrip(raw.data, roadtripsRaw.info.data[index].attributes)
  )
  dispatch(getRoadtripsByUserSuccess({ roadtrips: roadtrips }))
  const userEntries = await fetchUserEntries(token)
  const obj: { locations: LocationState[] } = { locations: [] }
  await userEntries.map((entry: { id: string; attributes: LocationState }) => {
    entry.attributes.id = '' + entry.id
    obj.locations.push(entry.attributes)
  })
  dispatch(getLocationsByUserSuccess(obj))
}
