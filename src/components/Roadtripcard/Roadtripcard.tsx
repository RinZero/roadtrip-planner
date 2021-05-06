import React, { memo, MouseEvent, useEffect, useState } from 'react'

import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  IconButton,
  Typography,
} from '@material-ui/core'
import { withTheme } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import austria from '../../assets/roadtrips/austria.jpg'
import burgenland from '../../assets/roadtrips/burgenland.jpg'
import kärnten from '../../assets/roadtrips/kärnten.jpg'
import niederösterreich from '../../assets/roadtrips/niederösterreich.jpg'
import oberösterreich from '../../assets/roadtrips/oberösterreich.jpg'
import salzburg from '../../assets/roadtrips/salzburg.jpg'
import steiermark from '../../assets/roadtrips/steiermark.jpg'
import tirol from '../../assets/roadtrips/tirol.jpg'
import wien from '../../assets/roadtrips/wien.jpg'
import { setEditRoadtrip } from '../../store/actions'
import { selectUserToken } from '../../store/selectors'
import { RoadtripState } from '../../store/user/types'
import { deleteRoadtrip } from '../../utils/AuthService'
import { initUserData } from '../../utils/initUserData'
import { reverseLookupHereData } from '../../utils/reverseLookupHereData'
import { getRoadtripImageLink } from './getRoadtripImageLink'

type RoadtripcardProps = {
  roadtrip: RoadtripState
}
const MyRoadtripCard = withTheme(styled(Card)`
  margin: ${(props) => props.theme.spacing(1)}px;
  min-width: ${(props) => props.theme.spacing(35)}px;
  max-width: ${(props) => props.theme.spacing(68.5)}px;
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
`)

const MyRoadtripCardActionArea = withTheme(styled(CardActionArea)`
  padding: ${(props) => props.theme.spacing(1.8)}px;
`)

const RoadtripCardContent = withTheme(styled(CardContent)`
  padding: ${(props) => props.theme.spacing(0.2)}px;
`)

// später kommt hier ein Bild von der Karte oderso hin
const MyRoadtripCardMedia = withTheme(styled(CardMedia)`
  height: ${(props) => props.theme.spacing(20)}px;
  background-color: lightblue;
  border-radius: 15px;
`)

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

  const images: Record<string, string> = {
    wien,
    niederösterreich,
    oberösterreich,
    burgenland,
    salzburg,
    tirol,
    steiermark,
    kärnten,
    austria,
  }
  const getImageByKey = (key: string) => {
    return images[key]
  }

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
            <IconButton>⛷️</IconButton>
            <IconButton>🍺</IconButton>
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
