import React, { memo, Suspense } from 'react'

import {
  Box,
  Grid,
  Typography,
  Link,
  useMediaQuery,
  withTheme,
  useTheme,
} from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

import ProfileComponent from '../../components/ProfileComponent'
import Roadtripcard from '../../components/Roadtripcard'
import {
  selectRoadtrips,
  selectUserLocations,
} from '../../store/user/selectors'
import { RoadtripState } from '../../store/user/types'

const LocationList = React.lazy(() => import('../../components/LoactionList'))

const RoadtripsBox = withTheme(styled(Box)`
  margin: ${(props) => props.theme.spacing(10)}px auto;
`)

const CarouselBox = withTheme(styled(Box)`
  overflow: scroll;
  max-height: 70vh;
`)

const RoadtripsCarousel = withTheme(styled(Carousel)``)

type RoadtripSlideProps = {
  roadtrips: RoadtripState[]
}
const RoadtripSlide = (props: RoadtripSlideProps) => {
  const { roadtrips } = props
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {isMobile && (
        <CarouselBox display="flex" flexWrap="wrap" justifyContent="center">
          {roadtrips[0] && <Roadtripcard roadtrip={roadtrips[0]} />}
          {roadtrips[1] && <Roadtripcard roadtrip={roadtrips[1]} />}
        </CarouselBox>
      )}
      {!isMobile && (
        <>
          <CarouselBox display="flex">
            {roadtrips[0] && <Roadtripcard roadtrip={roadtrips[0]} />}
            {roadtrips[1] && <Roadtripcard roadtrip={roadtrips[1]} />}
          </CarouselBox>
          <CarouselBox display="flex">
            {roadtrips[2] && <Roadtripcard roadtrip={roadtrips[2]} />}
            {roadtrips[3] && <Roadtripcard roadtrip={roadtrips[3]} />}
          </CarouselBox>
        </>
      )}
    </Box>
  )
}

const ProfilePage = () => {
  const roadtrips = useSelector(selectRoadtrips())
  const locations = useSelector(selectUserLocations())
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const slideRoadtrips = []
  if (roadtrips && !isMobile) {
    for (let i = 0; i < roadtrips.length; i += 4) {
      const chunk = roadtrips.slice(i, i + 4)
      slideRoadtrips.push(chunk)
    }
  }
  if (roadtrips && isMobile) {
    for (let i = 0; i < roadtrips.length; i += 2) {
      const chunk = roadtrips.slice(i, i + 2)
      slideRoadtrips.push(chunk)
    }
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5}>
        <ProfileComponent />
        <Box m="auto" width="60%">
          <Typography variant="h4">Meine Orte:</Typography>
          <Suspense fallback={<div>Loading...</div>}>
            {!locations || locations?.length === 0 ? (
              <Typography>
                Wie's aussieht hast du noch keine eigenen Orte. Klick auf den
                Link um einen{' '}
                <Link component={RouterLink} to={`/neuer_ort`} variant="h6">
                  Neuen Ort
                </Link>{' '}
                zu erstellen.
              </Typography>
            ) : (
              <LocationList />
            )}
          </Suspense>
        </Box>
      </Grid>
      <Grid item xs={12} sm={7}>
        <RoadtripsBox>
          <Typography variant="h4">Meine Roadtrips: </Typography>
          {slideRoadtrips.length === 0 ? (
            <Typography>
              Wie's aussieht hast du noch keine Roadtrips gespeichert. Klick auf
              den Link um einen{' '}
              <Link component={RouterLink} to={`/`} variant="h6">
                Neuen Roadtrip
              </Link>{' '}
              zu erstellen.
            </Typography>
          ) : (
            <RoadtripsCarousel
              fullHeightHover
              autoPlay={false}
              navButtonsAlwaysVisible={true}
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
          )}
        </RoadtripsBox>
      </Grid>
    </Grid>
  )
}

export default memo(ProfilePage)
