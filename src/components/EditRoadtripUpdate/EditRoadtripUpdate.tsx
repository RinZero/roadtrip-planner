import { memo, useCallback, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import {
  setEditRoadtripStops,
  setMapRoute,
  setMessage,
} from '../../store/actions'
import { selectEditRoadtrip, selectUserToken } from '../../store/selectors'
import { LocationState } from '../../store/user/types'
import { updateRoadtrip } from '../../utils/AuthService'
import { reverseLookupHereData } from '../../utils/reverseLookupHereData'
import EditRoadtripTemplate from '../EditRoadtripTemplate'
import LoadingAnimation from '../LoadingAnimation'

type EditRoadtripUpdateProps = {
  onUpdate?: () => void
}
const EditRoadtripUpdate = (props: EditRoadtripUpdateProps) => {
  const { onUpdate } = props
  const dispatch = useDispatch()
  const editRoadtrip = useSelector(selectEditRoadtrip())

  const addHereDataToStops = useCallback(() => {
    const test = async () => {
      return Promise.all(
        editRoadtrip.stops.map(async (stop) => {
          if (stop.api_entry_key) {
            const data = await reverseLookupHereData(stop.api_entry_key)

            return {
              ...stop,
              name: data.address.label,
              latitude: data.position.lat,
              longitude: data.position.lng,
            }
          }

          return stop
        })
      )
    }
    test().then((data) => {
      dispatch(setEditRoadtripStops({ editRoadtripStops: data }))
      dispatch(
        setMapRoute({
          mapRoute: data.map((stop) => stop.latitude + ',' + stop.longitude),
        })
      )
    })
  }, [editRoadtrip.stops, dispatch])

  useEffect(() => {
    addHereDataToStops()
  }, [])

  const token = useSelector(selectUserToken())
  const submitUpdate = async () => {
    if (editRoadtrip) {
      const result = await updateRoadtrip(editRoadtrip, token)
      if (typeof result === 'string') {
        dispatch(setMessage({ message: result }))
      }
    }
  }
  const onChange = (r: Array<Record<string, any>>) => {
    const updatedStops = r.map((item, index) => ({
      ...item,
      order: index,
    })) as LocationState[]
    dispatch(setEditRoadtripStops({ editRoadtripStops: updatedStops }))
    dispatch(
      setMapRoute({
        mapRoute: updatedStops.map(
          (stop) => stop.latitude + ',' + stop.longitude
        ),
      })
    )
  }
  const dndStateOrder = [
    {
      id: '',
      name: '',
    },
  ]
  return editRoadtrip.stops.every((stop) => stop.name !== undefined) ? (
    <EditRoadtripTemplate
      onChange={onChange}
      listInfo={editRoadtrip.stops}
      onSave={onUpdate || submitUpdate}
      dndStateOrder={dndStateOrder}
      usage={'update'}
    />
  ) : (
    <LoadingAnimation />
  )
}

export default memo(EditRoadtripUpdate)
