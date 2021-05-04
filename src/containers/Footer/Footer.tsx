import React, { memo, Suspense } from 'react'

import { Link, withTheme, BottomNavigation } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

import ErrorOverlay from '../../components/ErrorOverlay'
import { selectMessage } from '../../store/selectors'

const FooterLink = withTheme(styled(Link)`
  display: inline;
  color: #707070;
  font-size: ${(props) => props.theme.spacing(2.5)}px;
`)

const FooterNavigation = withTheme(styled(BottomNavigation)`
  height: ${(props) => props.theme.spacing(8)}px;
  z-index: 1;
  color: #707070;
  width: 100%;
  position: fixed;
  bottom: 0;
  padding-top: ${(props) => props.theme.spacing(2)}px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
`)

const Footer = () => {
  const message = useSelector(selectMessage())
  return (
    <FooterNavigation>
      <ErrorOverlay message={message} />
      <FooterLink component={RouterLink} to={`/impressum`} variant="h6">
        Impressum
      </FooterLink>
    </FooterNavigation>
  )
}

export default memo(Footer)
