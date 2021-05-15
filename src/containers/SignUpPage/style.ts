import { Box, Button, Card, Input, withTheme } from '@material-ui/core'
import styled from 'styled-components'

//SignUpForm Styles

export const StyledInput = withTheme(styled(Input)`
  margin: ${(props) => props.theme.spacing(1.5)}px 0;
  min-width: ${(props) => props.theme.spacing(31)}px;
`)
export const LoginButton = withTheme(styled(Button)`
  margin: auto;
  width: ${(props) => props.theme.spacing(28)}px;
`)
export const SignupCard = withTheme(styled(Card)`
  max-width: ${(props) => props.theme.spacing(50)}px;
  padding: ${(props) => props.theme.spacing(3.125)}px;
  margin: ${(props) => props.theme.spacing(7)}px;
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
`)

export const SignUpBox = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  heigh: 100%;
  margin-left: ${(props) => props.theme.spacing(7)}px;
  ${(props) => props.theme.breakpoints.down(1100)} {
    margin-right: ${(props) => props.theme.spacing(7)}px;
    margin-top: ${(props) => props.theme.spacing(1.5)}px;
  }
`)
