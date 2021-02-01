/* eslint-disable no-console */
import React, { memo, useState, MouseEvent } from 'react'

import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Link,
  withTheme,
  Typography,
  Popover,
  Box,
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import LogInForm from '../../components/LogInForm'
import { selectUserName } from '../../store/selectors'

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

const StyledPopover = withTheme(styled(Popover)`
  padding: ${(props) => props.theme.spacing(3)}px;
`)

const Header = () => {
  const userName = useSelector(selectUserName())
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'signUp-popover' : undefined
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
          {userName === 'Guest' && (
            <>
              <Typography
                variant="body1"
                color="primary"
                aria-describedby={id}
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                  setAnchorEl(event.currentTarget)
                }}
              >
                LogIn
              </Typography>
              <StyledPopover
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <Box m={3}>
                  <LogInForm />
                </Box>
              </StyledPopover>
              <Typography variant="body1">or</Typography>
              <Link
                variant="h6"
                onClick={() => console.log('placeholder to create location')}
              >
                SignUp
              </Link>
            </>
          )}
          {userName !== 'Guest' && (
            <>
              <Typography variant="body1">
                Hallo {userName}, tuastn????
              </Typography>

              <LogoutButton
                onClick={() => console.log('placeholder for logout')}
              >
                Log out
              </LogoutButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default memo(Header)
