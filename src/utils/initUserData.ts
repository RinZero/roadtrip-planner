import { Dispatch } from 'redux'

import {
  getRoadtripsByUserSuccess,
  getLocationsByUserSuccess,
} from '../store/actions'
import { LocationState } from '../store/user/types'
import { fetchUser } from './admin'
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
  await userEntries.map((entry: LocationState) => {
    obj.locations.push(entry)
  })
  dispatch(getLocationsByUserSuccess(obj))
}
