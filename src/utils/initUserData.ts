import { Dispatch } from 'redux'

import {
  getRoadtripsByUserSuccess,
  getLocationsByUserSuccess,
  getUsersByAdminSuccess,
} from '../store/actions'
import { LocationState, UserState } from '../store/user/types'
import { fetchUser } from './admin'
import { convertToRoadtrip } from './convertToRoadtrip'
import { fetchUserEntries } from './place'
import { fetchRoadtrips } from './roadtrip'

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
  const users = await fetchUser(token)
  if (
    (users.length !== undefined && users.length > 0) ||
    users.message !== 'Not allowed'
  ) {
    const userObj: { users: UserState[] } = { users: [] }
    await users.map((user: UserState) => {
      userObj.users.push(user)
    })
    dispatch(getUsersByAdminSuccess(userObj))
  }
}
