import React, { memo } from 'react'

import { Box, Grid, Typography, withTheme } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import LocationList from '../../components/LoactionList'
import ProfileComponent from '../../components/ProfileComponent'
import Roadtripcard from '../../components/Roadtripcard'
import { selectRoadtrips } from '../../store/user/selectors'
import { RoadtripState } from '../../store/user/types'

const RoadtripsBox = withTheme(styled(Box)`
  margin-top: ${(props) => props.theme.spacing(10)}px;
`)

type RoadtripSlideProps = {
  roadtrips: RoadtripState[]
}
const RoadtripSlide = (props: RoadtripSlideProps) => {
  const { roadtrips } = props
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box display="flex">
        {roadtrips[0] && <Roadtripcard roadtrip={roadtrips[0]} />}
        {roadtrips[1] && <Roadtripcard roadtrip={roadtrips[1]} />}
      </Box>
      <Box display="flex">
        {roadtrips[2] && <Roadtripcard roadtrip={roadtrips[2]} />}
        {roadtrips[3] && <Roadtripcard roadtrip={roadtrips[3]} />}
      </Box>
    </Box>
  )
}

const ProfilePage = () => {
  const roadtrips = useSelector(selectRoadtrips())
  const slideRoadtrips = []
  if (roadtrips) {
    for (let i = 0; i < roadtrips.length; i += 4) {
      const chunk = roadtrips.slice(i, i + 4)
      slideRoadtrips.push(chunk)
    }
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5}>
        <ProfileComponent />
        <Box m="auto" width="60%">
          <Typography variant="h4">Meine Orte: </Typography>
          <LocationList />
        </Box>
      </Grid>
      <Grid item xs={12} sm={7}>
        <RoadtripsBox>
          <Typography variant="h4">Meine Roadtrips: </Typography>
          <Carousel autoPlay={false} animation="slide" timeout={600}>
            {slideRoadtrips.map((chunk) => (
              <RoadtripSlide roadtrips={chunk} />
            ))}
          </Carousel>
        </RoadtripsBox>
      </Grid>
    </Grid>
  )
}

export default memo(ProfilePage)
