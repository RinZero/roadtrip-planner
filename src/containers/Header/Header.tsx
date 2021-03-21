/* eslint-disable prettier/prettier */
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
  Avatar,
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

import LogInForm from '../../components/LogInForm'
import { logOutSuccess } from '../../store/actions'
import {
  selectUserId,
  selectUserName,
  selectUserPicture,
} from '../../store/selectors'
import { logOut } from '../../utils/AuthService'

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
  const profilePic = useSelector(selectUserPicture())
  const dispatch = useDispatch()
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <HeaderLink component={RouterLink} to={`/`} variant="h6">
            Neuer Roadtrip
          </HeaderLink>
          <HeaderLink component={RouterLink} to={`/neuer_ort`} variant="h6">
            Ort hinzufügen
          </HeaderLink>
          <AccountButton
            aria-label="profile"
            onClick={() => console.log('placeholder to profile')}
          >
            {userName ? (
              <Avatar alt={userName + 's Profilbild'} src={profilePic} />
            ) : (
              <AccountCircleIcon />
            )}
          </AccountButton>
          {userName === 'Guest' && (
            <>
              <PopupState variant="popover" popupId="login-popup-popover">
                {(popupState) => (
                  <>
                    <div {...bindTrigger(popupState)}>
                      <Typography variant="body1" color="primary">
                        LogIn
                      </Typography>
                    </div>
                    <StyledPopover
                      {...bindPopover(popupState)}
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
                  </>
                )}
              </PopupState>
              <Typography variant="body1">or</Typography>
              <Link component={RouterLink} to={`/sign_up`} variant="h6">
                SignUp
              </Link>
            </>
          )}
          {userName !== 'Guest' && (
            <>
              <Typography variant="body1" color="textPrimary">
                Hallo {userName}, tuastn????
              </Typography>

              <LogoutButton
                onClick={() => {
                  dispatch(logOutSuccess())
                }}
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
