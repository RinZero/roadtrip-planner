import React, { memo } from 'react'

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
import styled from 'styled-components'

const MyRoadtripCard = withTheme(styled(Card)`
  min-width: ${(props) => props.theme.spacing(50)}px;
  max-width: ${(props) => props.theme.spacing(68.5)}px;
  padding: ${(props) => props.theme.spacing(3.125)}px;
  margin: 0 ${(props) => props.theme.spacing(6.25)}px
    ${(props) => props.theme.spacing(6.25)}px 0;
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
`)

// später kommt hier ein Bild von der Karte oderso hin
const MyRoadtripCardMedia = withTheme(styled(CardMedia)`
  height: ${(props) => props.theme.spacing(20)}px;
  background-color: lightblue;
  border-radius: 15px;
`)

const start = 'Salzburg'
const destination = 'Graz'
const stopsnumber = 15

const Roadtripcard = () => {
  return (
    <MyRoadtripCard variant="outlined" square>
      <CardActionArea>
        <MyRoadtripCardMedia
          image="data:image/jpeg;base64,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"
          src="data:image/jpeg;base64,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"
          title="Your Roadtrip from Salzuburg to Graz"
        />
        <CardContent>
          <Typography align="left" variant="h5" component="h2">
            {start} - {destination}
          </Typography>
          <Typography align="left" color="textSecondary">
            {stopsnumber} Stops
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <div>
          <IconButton>⛷️</IconButton>
          <IconButton>🍺</IconButton>
        </div>
        <Button className="large">
          <Typography variant="button">Route</Typography>
        </Button>
      </Box>
    </MyRoadtripCard>
  )
}
export default memo(Roadtripcard)
