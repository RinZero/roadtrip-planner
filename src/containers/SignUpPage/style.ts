import {
  Box,
  Button,
  Card,
  TextField,
  withTheme,
  Typography,
  IconButton,
} from '@material-ui/core'
import styled from 'styled-components'

import background from '../../assets/manAtLake.jpg'
import backgroundMobile from '../../assets/roadAbove.jpg'
//SignUpForm Styles

export const StyledInput = withTheme(styled(TextField)`
  margin: ${(props) => props.theme.spacing(0.2)}px 0;
  min-width: ${(props) => props.theme.spacing(31)}px;
`)
export const LoginButton = withTheme(styled(Button)`
  margin: auto;
  width: ${(props) => props.theme.spacing(28)}px;
`)
export const SignupCard = withTheme(styled(Card)`
  max-width: ${(props) => props.theme.spacing(50)}px;
  padding: ${(props) => props.theme.spacing(3.125)}px;
  margin: ${(props) => props.theme.spacing(4)}px
    ${(props) => props.theme.spacing(7)}px;
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
`)

//SignUpPage Styles

export const SignUpPageContainer = withTheme(styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  ${(props) => props.theme.breakpoints.up(1100)} {
    flex-direction: row;
    height: calc(
      100vh - ${(props) => props.theme.spacing(18)}px
    ); //100vh - (header(10) +footer(8))
  }
  margin-bottom: 0;
  margin: ${(props) => props.theme.spacing(10)}px 0
    ${(props) => props.theme.spacing(8)}px 0;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center bottom;
  ${(props) => props.theme.breakpoints.down(1100)} {
    background-image: url(${backgroundMobile});
  }
`)

export const SignUpBox = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  margin-left: ${(props) => props.theme.spacing(7)}px;
  ${(props) => props.theme.breakpoints.down(1100)} {
    margin-right: ${(props) => props.theme.spacing(7)}px;
    margin-top: ${(props) => props.theme.spacing(1.5)}px;
  }
  ${(props) => props.theme.breakpoints.down(1100)} {
    height: calc(100vh - ${(props) => props.theme.spacing(18)}px);
  }
`)

export const TitleTypography = withTheme(styled(Typography)`
  color: white;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.75);
`)

export const DownscrollIconButton = withTheme(styled(IconButton)`
  background-color: white;
  border-radius: 100px;
  height: 30px;
  width: 30px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  ${(props) => props.theme.breakpoints.up(1100)} {
    display: none;
  }
`)
