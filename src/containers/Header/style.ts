import {
  Box,
  Button,
  Link,
  AppBar,
  IconButton,
  Toolbar,
  Popover,
  withTheme,
} from '@material-ui/core'
import styled from 'styled-components'

export const LogoutButton = withTheme(styled(Button)`
  color: #ffffff;
  font-size: ${(props) => props.theme.spacing(1.75)}px;
  padding: ${(props) => props.theme.spacing(0.125)}px
    ${(props) => props.theme.spacing(0.5)}px;
  font-weight: normal;
  background-color: #e67676;
  border-radius: 8px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    font-size: ${(props) => props.theme.spacing(2)}px;
    padding: ${(props) => props.theme.spacing(0.125)}px
      ${(props) => props.theme.spacing(1)}px;
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    font-size: ${(props) => props.theme.spacing(2.5)}px;
    padding: ${(props) => props.theme.spacing(0.125)}px
      ${(props) => props.theme.spacing(4.5)}px;
  }
`)
export const AccountButton = withTheme(styled(IconButton)`
  color: #000000;
  font-size: ${(props) => props.theme.spacing(3.75)}px;
  padding: 0px;
`)
export const HeaderLink = withTheme(styled(Link)`
  display: inline;
  color: #707070;
  font-size: ${(props) => props.theme.spacing(2.5)}px;
`)

export const StyledPopover = withTheme(styled(Popover)`
  padding: ${(props) => props.theme.spacing(3)}px;
`)

export const HeaderAppBar = withTheme(styled(AppBar)`
  color: #707070;
  padding-top: ${(props) => props.theme.spacing(2)}px;
  MuiPopover-paper {
    top: 0;
  }
`)

export const ToolbarContainer = withTheme(styled(Toolbar)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing(1.1)}px;
`)

export const HeaderIconButton = withTheme(styled(IconButton)`
  ${(props) => props.theme.breakpoints.up('md')} {
    display: none;
  }
`)

export const LogoBox = withTheme(styled(Box)`
  display: block;
  margin-left: ${(props) => props.theme.spacing(2)}px;
  margin-right: auto;
  img {
    width: ${(props) => props.theme.spacing(5)}px;
    ${(props) => props.theme.breakpoints.up('lg')} {
      width: ${(props) => props.theme.spacing(30)}px;
    }
  }
`)
