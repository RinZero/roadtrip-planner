import React, { memo, MouseEvent, useEffect, useState } from 'react'

import { Box, IconButton, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { setEditRoadtrip } from '../../store/actions'
import { selectUserToken } from '../../store/selectors'
import { RoadtripState } from '../../store/user/types'
import { deleteRoadtrip } from '../../utils/AuthService'
import { initUserData } from '../../utils/initUserData'
import { reverseLookupHereData } from '../../utils/reverseLookupHereData'
import { getRoadtripImageLink, getImageByKey } from './getRoadtripImageLink'
import {
  MyRoadtripCard,
  MyRoadtripCardActionArea,
  RoadtripCardContent,
  MyRoadtripCardMedia,
} from './style'

type RoadtripcardProps = {
  roadtrip: RoadtripState
}

const Roadtripcard = (props: RoadtripcardProps) => {
  const [postalCodeFirst, setPostalCodeFirst] = useState('0')
  const [imageName, setImageName] = useState('austria')
  const { roadtrip } = props
  const name = roadtrip.name
  const stopsnumber = roadtrip.stops ? roadtrip.stops.length : 0
  const history = useHistory()
  const dispatch = useDispatch()
  const token = useSelector(selectUserToken())

  useEffect(() => {
    const fetchData = async () => {
      const apiEntryKey = roadtrip.stops[0].api_entry_key
        ? roadtrip.stops[0].api_entry_key
        : undefined
      const data = apiEntryKey ? await reverseLookupHereData(apiEntryKey) : '0'
      if (data !== '0') setPostalCodeFirst(data.address.postalCode[0])
      const imagePath = getRoadtripImageLink(postalCodeFirst)
      setImageName(imagePath)
    }

    fetchData()
  }, [postalCodeFirst, props.roadtrip.stops, roadtrip.stops])

  return (
    <MyRoadtripCard
      variant="outlined"
      square
      onClick={() => {
        dispatch(setEditRoadtrip({ editRoadtrip: roadtrip }))
        history.push('/edit_roadtrip')
      }}
    >
      <MyRoadtripCardActionArea>
        <MyRoadtripCardMedia
          image={getImageByKey(imageName)}
          src={getImageByKey(imageName)}
          title="Roadtrip Bild"
        />
        <RoadtripCardContent>
          <Typography align="left" variant="h5" component="h2">
            {name}
          </Typography>
          <Typography align="left" color="textSecondary">
            {stopsnumber} Stops
          </Typography>
        </RoadtripCardContent>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <div>
            <IconButton size="small">⛷️</IconButton>
            <IconButton size="small">🍺</IconButton>
          </div>
          <IconButton
            onClick={async (e: MouseEvent) => {
              e.preventDefault()
              e.stopPropagation()
              await deleteRoadtrip(token, roadtrip.id)
              initUserData(token, dispatch)
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </MyRoadtripCardActionArea>
    </MyRoadtripCard>
  )
}
export default memo(Roadtripcard)
