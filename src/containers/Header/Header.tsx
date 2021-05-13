import React, { memo, Suspense, useState, useEffect } from 'react'

import {
  Link,
  Typography,
  Box,
  Avatar,
  MenuItem,
  Menu,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useHistory } from 'react-router-dom'

import logoMobile from '../../assets/roadabout_logo.svg'
import logo from '../../assets/roadabout_textlogo.svg'
import { logOutSuccess } from '../../store/actions'
import { selectUserName, selectUserPicture } from '../../store/selectors'
import {
  LogoutButton,
  AccountButton,
  HeaderLink,
  StyledPopover,
  HeaderAppBar,
  ToolbarContainer,
  HeaderIconButton,
  LogoBox,
} from './style'

const LogInForm = React.lazy(() => import('../../components/LogInForm'))

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [value, setValue] = useState(1)
  const history = useHistory()
  const userName = useSelector(selectUserName())
  const profilePic = useSelector(selectUserPicture())
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useDispatch()

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const spruchArray = [
    `Hallo ${userName}, tuastn?`,
    `It's me, ${userName}!`,
    `Moin ${userName}, wat loyft?!`,
    `Whats up ${userName}?`,
    `Hey ${userName}, alles fit?`,
    `Ahoy, ${userName}!`,
    `Was macht die Kunst, ${userName}?`,
    `Habedere, ${userName}!`,
    `Tach auch, ${userName}!`,
    `High Five, ${userName}!`,
    `Sers, ${userName}!`,
    `Aloha, ${userName}!`,
    `Peace, ${userName}!`,
    `Na, ${userName}! Auch hier?`,
    `Ave, ${userName}!`,
    `Howdy, ${userName}!`,
  ]

  useEffect(() => {
    setValue(Math.floor(Math.random() * spruchArray.length))
  }, [spruchArray.length])

  return (
    <HeaderAppBar>
      <ToolbarContainer>
        <LogoBox>
          <HeaderLink component={RouterLink} to={`/`}>
            <img src={isTablet ? logoMobile : logo} alt="Roadabout Logo" />
          </HeaderLink>
        </LogoBox>
        {!isMobile && (
          <>
            <HeaderLink component={RouterLink} to={`/step/:1`} variant="h6">
              Neuer Roadtrip
            </HeaderLink>
            {userName !== 'Guest' && (
              <HeaderLink
                HeaderLink
                component={RouterLink}
                to={`/neuer_ort`}
                variant="h6"
              >
                Ort hinzufügen
              </HeaderLink>
            )}
          </>
        )}

        <AccountButton
          id={'header_profil_button'}
          aria-label="profile"
          onClick={() =>
            history.push(userName === 'Guest' ? '/sign_up' : '/profile')
          }
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
                    <Link variant="h6" color="primary">
                      LogIn
                    </Link>
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
                      <Suspense fallback={<div>Loading...</div>}>
                        <LogInForm />
                      </Suspense>
                    </Box>
                  </StyledPopover>
                </>
              )}
            </PopupState>
            {!isMobile && <Typography variant="body1">or</Typography>}
            <Link component={RouterLink} to={`/sign_up`} variant="h6">
              SignUp
            </Link>
          </>
        )}
        {userName !== 'Guest' && (
          <>
            <Typography variant="body1" color="textPrimary">
              {spruchArray[value]}
            </Typography>

            {!isMobile && (
              <LogoutButton
                onClick={() => {
                  dispatch(logOutSuccess())
                }}
                component={RouterLink}
                to={`/`}
              >
                Log out
              </LogoutButton>
            )}
          </>
        )}
        <HeaderIconButton onClick={handleClick}>
          <MenuIcon />
        </HeaderIconButton>
        <Menu
          autoFocus={false}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem component={RouterLink} to={`/step/:1`}>
            Neuer Roadtrip
          </MenuItem>
          {userName !== 'Guest' && (
            <>
              <MenuItem component={RouterLink} to={`/neuer_ort`}>
                Ort hinzufügen
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(logOutSuccess())
                }}
                component={RouterLink}
                to={`/`}
              >
                <LogoutButton>Log out</LogoutButton>
              </MenuItem>
            </>
          )}
        </Menu>
      </ToolbarContainer>
    </HeaderAppBar>
  )
}

export default memo(Header)
