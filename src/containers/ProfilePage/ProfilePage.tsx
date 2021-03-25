import React, { memo, Suspense } from 'react'

import { Box, Grid, Typography, withTheme } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import ProfileComponent from '../../components/ProfileComponent'
import Roadtripcard from '../../components/Roadtripcard'
import { selectRoadtrips } from '../../store/user/selectors'
import { RoadtripState } from '../../store/user/types'

const LocationList = React.lazy(() => import('../../components/LoactionList'))

const RoadtripsBox = withTheme(styled(Box)`
  margin-top: ${(props) => props.theme.spacing(10)}px;
`)

const CarouselBox = withTheme(styled(Box)`
  overflow: scroll;
  max-height: 70vh;
`)
const RoadtripsCarousel = withTheme(styled(Carousel)``)

const ProfileGrid = withTheme(styled(Grid)``)

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
      <CarouselBox display="flex" flexWrap="wrap">
        {roadtrips[0] && <Roadtripcard roadtrip={roadtrips[0]} />}
        {roadtrips[1] && <Roadtripcard roadtrip={roadtrips[1]} />}
        {roadtrips[2] && <Roadtripcard roadtrip={roadtrips[2]} />}
        {roadtrips[3] && <Roadtripcard roadtrip={roadtrips[3]} />}
      </CarouselBox>
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
    <ProfileGrid container spacing={3}>
      <Grid item xs={12} sm={5}>
        <ProfileComponent />
        <Box m="auto" width="60%">
          <Typography variant="h4">Meine Orte:</Typography>
          <Suspense fallback={<div>Loading...</div>}>
            <LocationList />
          </Suspense>
        </Box>
      </Grid>
      <Grid item xs={12} sm={7}>
        <RoadtripsBox>
          <Typography variant="h4">Meine Roadtrips: </Typography>
          <RoadtripsCarousel
            fullHeightHover
            autoPlay={false}
            animation="slide"
            timeout={600}
            navButtonsProps={{
              // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
              style: {
                backgroundColor: '#71b255',
              },
            }}
          >
            {slideRoadtrips.map((chunk) => (
              <RoadtripSlide roadtrips={chunk} />
            ))}
          </RoadtripsCarousel>
        </RoadtripsBox>
      </Grid>
    </ProfileGrid>
  )
}

export default memo(ProfilePage)
