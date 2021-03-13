import React, { memo } from 'react'

import { Box, Grid, Typography } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'

import ProfileComponent from '../../components/ProfileComponent'
import Roadtripcard from '../../components/Roadtripcard'
import { RoadtripState } from '../../store/user/types'

type RoadtripSildeProps = {
  key: number
  roadtrips: RoadtripState[]
}
const RoadtripSlide = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box display="flex">
        <Roadtripcard />
        <Roadtripcard />
      </Box>
      <Box display="flex">
        <Roadtripcard />
        <Roadtripcard />
      </Box>
    </Box>
  )
}
const ProfilePage = () => {
  const roadtrips = [1, 2, 3, 4]
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5}>
        <ProfileComponent />
      </Grid>
      <Grid item xs={12} sm={7}>
        <Typography variant="h4">Meine Roadtrips:</Typography>
        <Carousel autoPlay={false} animation="slide" timeout={600}>
          {roadtrips.map((roadtrip, i) => (
            <RoadtripSlide />
          ))}
        </Carousel>
      </Grid>
    </Grid>
  )
}

export default memo(ProfilePage)
