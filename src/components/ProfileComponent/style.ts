import { Box, Button, Avatar, Typography, withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const ProfileBox = withTheme(styled(Box)`
  margin-top: ${(props) => props.theme.spacing(4)}px;
  margin-bottom: ${(props) => props.theme.spacing(2)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${(props) => props.theme.breakpoints.up('lg')} {
    margin-top: ${(props) => props.theme.spacing(6)}px;
    margin-bottom: ${(props) => props.theme.spacing(4)}px;
  }
`)

export const PopperBox = withTheme(styled.form`
  box-shadow: 0px 3px 6px 0px #b1b1b1;
  padding: ${(props) => props.theme.spacing(2)}px;
  background-color: white;
  border-radius: 15px;
`)

export const IconBox = withTheme(styled(Box)`
  display: flex;
  justify-content: space-between;
  margin: ${(props) => props.theme.spacing(2.5)}px
    ${(props) => props.theme.spacing(1)}px
    ${(props) => props.theme.spacing(1)}px;
`)

export const ProfileAvatar = withTheme(styled(Avatar)`
  width: ${(props) => props.theme.spacing(25)}px;
  height: ${(props) => props.theme.spacing(25)}px;
  margin: 0 auto;
`)

export const TypographyMarginSmall = withTheme(styled(Typography)`
  margin-top: ${(props) => props.theme.spacing(1)}px;
`)

export const InfoButton = withTheme(styled(Button)`
  background-color: white;
  box-shadow: 0px 3px 6px 0px #b1b1b1;
  height: ${(props) => props.theme.spacing(5)}px;
  margin-right: ${(props) => props.theme.spacing(0.5)}px;
`)

export const EditButton = withTheme(styled(Button)`
  background-color: #71b255;
  box-shadow: 0px 3px 6px 0px #b1b1b1;
  color: white;
  height: ${(props) => props.theme.spacing(5)}px;
  min-width: ${(props) => props.theme.spacing(5)}px;
  &:hover,
  &:active {
    background-color: #355727;
  }
`)

export const ConfirmButton = withTheme(styled(Button)`
  background-color: #71b255;
  box-shadow: 0px 3px 6px 0px #b1b1b1;
  color: white;
  height: ${(props) => props.theme.spacing(5)}px;
  min-width: ${(props) => props.theme.spacing(5)}px;
  &:hover,
  &:active {
    background-color: #355727;
  }
`)
