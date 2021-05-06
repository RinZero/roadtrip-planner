import React, { memo, Suspense } from 'react'

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
import styled from 'styled-components'

import logoMobile from '../../assets/roadabout_logo.svg'
import logo from '../../assets/roadabout_textlogo.svg'
import { setProgressStep, logOutSuccess } from '../../store/actions'
import {
  selectUserId,
  selectUserName,
  selectUserPicture,
} from '../../store/selectors'

const LogInForm = React.lazy(() => import('../../components/LogInForm'))

const LogoutButton = withTheme(styled(Button)`
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
const AccountButton = withTheme(styled(IconButton)`
  color: #000000;
  font-size: ${(props) => props.theme.spacing(3.75)}px;
  padding: 0px;
`)
const HeaderLink = withTheme(styled(Link)`
  display: none;
  ${(props) => props.theme.breakpoints.up('md')} {
    display: inline;
    color: #707070;
    font-size: ${(props) => props.theme.spacing(2.5)}px;
  }
`)

const StyledPopover = withTheme(styled(Popover)`
  padding: ${(props) => props.theme.spacing(3)}px;
`)

const HeaderAppBar = withTheme(styled(AppBar)`
  color: #707070;
  padding-top: ${(props) => props.theme.spacing(2)}px;
  MuiPopover-paper {
    top: 0;
  }
`)

const ToolbarContainer = withTheme(styled(Toolbar)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing(1.1)}px;
`)

const HeaderIconButton = withTheme(styled(IconButton)`
  ${(props) => props.theme.breakpoints.up('md')} {
    display: none;
  }
`)

const LogoBox = withTheme(styled(Box)`
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

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
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
  const randomNumber = Math.floor(Math.random() * spruchArray.length)
  return (
    <HeaderAppBar>
      <ToolbarContainer>
        <LogoBox>
          <HeaderLink
            onClick={() => dispatch(setProgressStep({ progressStep: '1' }))}
            component={RouterLink}
            to={`/`}
          >
            <img src={isTablet ? logoMobile : logo} alt="Roadabout Logo" />
          </HeaderLink>
        </LogoBox>
        <HeaderLink component={RouterLink} to={`/`} variant="h6">
          Neuer Roadtrip
        </HeaderLink>
        <HeaderLink
          HeaderLink
          component={RouterLink}
          to={`/neuer_ort`}
          variant="h6"
        >
          Ort hinzufügen
        </HeaderLink>

        <AccountButton
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
              {spruchArray[randomNumber]}
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
          <MenuItem component={RouterLink} to={`/`}>
            Neuer Roadtrip
          </MenuItem>
          <MenuItem component={RouterLink} to={`/neuer_ort`}>
            Ort hinzufügen
          </MenuItem>
          {userName !== 'Guest' && (
            <MenuItem
              onClick={() => {
                dispatch(logOutSuccess())
              }}
              component={RouterLink}
              to={`/`}
            >
              <LogoutButton>Log out</LogoutButton>
            </MenuItem>
          )}
        </Menu>
      </ToolbarContainer>
    </HeaderAppBar>
  )
}

export default memo(Header)
