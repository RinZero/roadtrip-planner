import { useDispatch, useSelector } from 'react-redux'

import {
  getRoadtripsByUserSuccess,
  getLocationsByUserSuccess,
} from '../store/actions'
import { selectUserToken } from '../store/selectors'
import { LocationState } from '../store/user/types'
import { fetchRoadtrips, fetchUserEntries } from './AuthService'
import { convertToRoadtrip } from './convertToRoadtrip'

export const initUserData = async () => {
  const token = useSelector(selectUserToken())
  const roadtripsRaw = await fetchRoadtrips(token)
  const dispatch = useDispatch()
  const roadtrips = roadtripsRaw.roadtrips.map(
    (
      raw: {
        data: Array<Record<string, any>>
      },
      index: number
    ) => convertToRoadtrip(raw.data, roadtripsRaw.info.data[index].attributes)
  )
  dispatch(getRoadtripsByUserSuccess({ roadtrips: roadtrips }))
  const userEntries = await fetchUserEntries(user.token)
  const obj: { locations: LocationState[] } = { locations: [] }
  userEntries.map((entry: { attributes: LocationState }) =>
    obj.locations.push(entry.attributes)
  )
  dispatch(getLocationsByUserSuccess(obj))
}
