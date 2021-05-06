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

const LocationList = React.lazy(() => import('../../components/LocationList'))
const ProfilePageStyles = withTheme(styled.div`
  overflow-x: hidden;
  padding: ${(props) => props.theme.spacing(12)}px 0
    ${(props) => props.theme.spacing(10)}px 0;

  ${(props) => props.theme.breakpoints.up('md')} {
    height: calc(100vh - 40px);
    //40px come from LogoImg in App.css (maybe remove it??)
  }
`)

const RoadtripsBox = withTheme(styled(Box)`
  margin: ${(props) => props.theme.spacing(1)}px auto;
`)

const CarouselBox = withTheme(styled(Box)`
  max-height: 70vh;
`)

const RoadtripsCarousel = withTheme(styled(Carousel)``)

type RoadtripSlideProps = {
  roadtrips: RoadtripState[]
}
const RoadtripSlide = (props: RoadtripSlideProps) => {
  const { roadtrips } = props
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
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
        </CarouselBox>
      )}
      {isTablet && (
        <CarouselBox display="flex" flexWrap="wrap" justifyContent="center">
          {roadtrips[0] && <Roadtripcard roadtrip={roadtrips[0]} />}
          {roadtrips[1] && <Roadtripcard roadtrip={roadtrips[1]} />}
        </CarouselBox>
      )}
      {isDesktop && (
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
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const slideRoadtrips = []
  if (roadtrips && isDesktop) {
    for (let i = 0; i < roadtrips.length; i += 4) {
      const chunk = roadtrips.slice(i, i + 4)
      slideRoadtrips.push(chunk)
    }
  }
  if (roadtrips && isTablet) {
    for (let i = 0; i < roadtrips.length; i += 2) {
      const chunk = roadtrips.slice(i, i + 2)
      slideRoadtrips.push(chunk)
    }
  }
  if (roadtrips && isMobile) {
    for (let i = 0; i < roadtrips.length; i += 1) {
      const chunk = roadtrips.slice(i, i + 1)
      slideRoadtrips.push(chunk)
    }
  }
  return (
    <ProfilePageStyles>
      <Grid container spacing={3}>
        <Grid item xs={11} sm={5}>
          <ProfileComponent />
          <Box m="auto" width="60%" textAlign="center">
            <Typography variant="h4" paragraph={true}>
              Meine Orte:
            </Typography>
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
          <RoadtripsBox textAlign="center">
            <Typography variant="h4" paragraph={true}>
              Meine Roadtrips:{' '}
            </Typography>
            {slideRoadtrips.length === 0 ? (
              <Box m="auto" width="60%">
                <Typography>
                  Wie's aussieht hast du noch keine Roadtrips gespeichert. Klick
                  auf den Link um einen{' '}
                  <Link component={RouterLink} to={`/`} variant="h6">
                    Neuen Roadtrip
                  </Link>{' '}
                  zu erstellen.
                </Typography>
              </Box>
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
    </ProfilePageStyles>
  )
}

export default memo(ProfilePage)
