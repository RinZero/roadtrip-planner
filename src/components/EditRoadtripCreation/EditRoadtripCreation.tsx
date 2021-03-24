import React, { memo, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { setRoadtripInfos } from '../../store/actions'
import { selectRoadtripInfos, selectUserToken } from '../../store/selectors'
import { createRoadtrip, createRoadtripType } from '../../utils/AuthService'
import EditRoadtripTemplate from '../EditRoadtripTemplate'

const EditRoadtripCreation = () => {
  const dispatch = useDispatch()
  const roadtripInfo = useSelector(selectRoadtripInfos())
  const dndStateOrder = [
    {
      address: '',
      categories: { id: '', name: '' },
      coordinates: [0, 0],
      api_key: '',
    },
  ]
  const token = useSelector(selectUserToken())

  const submitRoadtrip = useCallback(async () => {
    const roadtripData: createRoadtripType = {
      data: {
        type: 'roadtrip',
        locations: [],
        attributes: {
          name: 'Roadtrip test',
          public: false,
          distance: 1,
        },
      },
    }
    roadtripInfo.forEach((info) => {
      //TODO if check between api and user entries
      if (info.entry) {
        // User Entry
        roadtripData.data.locations.push({
          api_entry: undefined,
          user_entry: info.entry,
        })
      } else {
        // APi entry
        roadtripData.data.locations.push({
          api_entry: { api_entry_key: info.api_key },
          user_entry: undefined,
        })
      }
    })
    const result = await createRoadtrip(roadtripData, token)
  }, [roadtripInfo, token])

  const onChange = (r: Array<Record<string, any>>) => {
    dispatch(
      setRoadtripInfos({
        roadtripInfos: r as {
          address: string
          categories: {
            id: string
            name: string
            primary?: boolean | undefined
          }
          coordinates: number[]
          api_key: string
        }[],
      })
    )
  }
  return (
    <EditRoadtripTemplate
      dndStateOrder={dndStateOrder}
      onChange={onChange}
      onSave={submitRoadtrip}
      listInfo={roadtripInfo}
    />
  )
}
export default memo(EditRoadtripCreation)
