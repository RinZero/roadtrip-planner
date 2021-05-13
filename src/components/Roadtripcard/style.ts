import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  withTheme,
} from '@material-ui/core'
import styled from 'styled-components'

//Roadtripcard Style

export const MyRoadtripCard = withTheme(styled(Card)`
  margin: ${(props) => props.theme.spacing(1)}px;
  width: ${(props) => props.theme.spacing(34)}px;
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  ${(props) => props.theme.breakpoints.up(1025)} {
    width: ${(props) => props.theme.spacing(29)}px;
  }
  ${(props) => props.theme.breakpoints.up(1400)} {
    width: ${(props) => props.theme.spacing(32)}px;
  }
`)

export const MyRoadtripCardActionArea = withTheme(styled(CardActionArea)`
  padding: ${(props) => props.theme.spacing(1.8)}px;
`)

export const RoadtripCardContent = withTheme(styled(CardContent)`
  padding: ${(props) => props.theme.spacing(0.2)}px;
`)

export const MyRoadtripCardMedia = withTheme(styled(CardMedia)`
  height: ${(props) => props.theme.spacing(20)}px;
  background-color: lightblue;
  border-radius: 15px;
  ${(props) => props.theme.breakpoints.up(1025)} {
    height: ${(props) => props.theme.spacing(15)}px;
  }
  ${(props) => props.theme.breakpoints.up(1400)} {
    height: ${(props) => props.theme.spacing(20)}px;
  }
`)
