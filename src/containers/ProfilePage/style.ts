import { Box, Typography, withTheme } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import styled from 'styled-components'

export const ProfilePageStyles = withTheme(styled.div`
  overflow-x: hidden;
  padding: ${(props) => props.theme.spacing(12)}px 0
    ${(props) => props.theme.spacing(10)}px 0;

  ${(props) => props.theme.breakpoints.up('md')} {
    height: calc(100vh - 40px);
    //40px come from LogoImg in App.css (maybe remove it??)
  }
`)

export const RoadtripsBox = withTheme(styled(Box)`
  margin: 0 auto;
`)

export const CarouselBox = withTheme(styled(Box)`
  max-height: 70vh;
`)

//needs to be custom class for navButtonsProps
export const RoadtripsCarousel = withTheme(styled(Carousel)``)

export const MeineOrteTypography = withTheme(styled(Typography)`
  border-top: 1px solid rgb(0 0 0 / 16%);
  padding: ${(props) => props.theme.spacing(1)}px 0;
  ${(props) => props.theme.breakpoints.down('md')} {
    margin: 0;
  }
`)
