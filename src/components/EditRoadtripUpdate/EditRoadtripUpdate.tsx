import React, { memo, useCallback, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { setEditRoadtripStops } from 'store/actions'
import { selectEditRoadtrip, selectUserToken } from 'store/selectors'
import { LocationState } from 'store/user/types'
import { updateRoadtrip } from 'utils/AuthService'
import { reverseLookupHereData } from 'utils/reverseLookupHereData'

import EditRoadtripTemplate from '../EditRoadtripTemplate'

const EditRoadtripUpdate = () => {
  const dispatch = useDispatch()
  const editRoadtrip = useSelector(selectEditRoadtrip())

  const addHereDataToStops = useCallback(() => {
    const test = async () => {
      return Promise.all(
        editRoadtrip.stops.map(async (stop) => {
          if (stop.api_entry_key) {
            const data = await reverseLookupHereData(stop.api_entry_key)

            return { ...stop, name: data.address.label }
          }
          return stop
        })
      )
    }
    test().then((data) => {
      dispatch(setEditRoadtripStops({ editRoadtripStops: data }))
    })
  }, [editRoadtrip.stops, dispatch])

  useEffect(() => {
    addHereDataToStops()
  }, [])

  const token = useSelector(selectUserToken())
  const submitUpdate = async () => {
    if (editRoadtrip) {
      await updateRoadtrip(editRoadtrip, token)
    }
  }
  const onChange = (r: Array<Record<string, any>>) => {
    dispatch(setEditRoadtripStops({ editRoadtripStops: r as LocationState[] }))
  }
  const dndStateOrder = [
    {
      id: '',
      name: '',
    },
  ]
  return editRoadtrip.stops[0].name ? (
    <EditRoadtripTemplate
      onChange={onChange}
      listInfo={editRoadtrip.stops}
      onSave={submitUpdate}
      dndStateOrder={dndStateOrder}
    />
  ) : (
    <h1>...loading</h1>
  )
}

export default memo(EditRoadtripUpdate)
