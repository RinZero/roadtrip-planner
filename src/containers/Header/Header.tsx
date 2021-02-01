/* eslint-disable no-console */
import React, { memo } from 'react'

import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Link,
  withTheme,
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import styled from 'styled-components'

// Art 2
const LogoutButton = withTheme(styled(Button)`
  color: #ffffff;
  font-size: ${(props) => props.theme.spacing(2.5)}px;
  font-weight: normal;
  background-color: #e67676;
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing(0.125)}px
    ${(props) => props.theme.spacing(4.5)}px;
`)
const AccountButton = withTheme(styled(IconButton)`
  color: #000000;
  font-size: 30px;
  padding: 0px;
`)
const HeaderLink = withTheme(styled(Link)`
  color: #707070;
  font-size: 20px;
`)

const Header = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <HeaderLink
            onClick={() => console.log('placeholder to create roadtrip')}
          >
            Neuer Roadtrip
          </HeaderLink>
          <HeaderLink
            onClick={() => console.log('placeholder to create location')}
          >
            Ort hinzufügen
          </HeaderLink>
          <AccountButton aria-label="profile">
            <AccountCircleIcon
              onClick={() => console.log('placeholder to profile')}
            />
          </AccountButton>
          <LogoutButton onClick={() => console.log('placeholder for logout')}>
            Log out
          </LogoutButton>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default memo(Header)
