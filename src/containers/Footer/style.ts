import { Link, BottomNavigation, withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const FooterLink = withTheme(styled(Link)`
  display: inline;
  color: #707070;
  font-size: ${(props) => props.theme.spacing(2.5)}px;
`)

export const FooterNavigation = withTheme(styled(BottomNavigation)`
  height: ${(props) => props.theme.spacing(8)}px;
  z-index: 1;
  color: #707070;
  width: 100%;
  position: fixed;
  bottom: 0;
  padding-top: ${(props) => props.theme.spacing(2)}px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
`)
