import React, { memo } from 'react'

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
  Paper,
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import logo from '../../assets/roadabout_textlogo.svg'
import { logOutSuccess } from '../../store/actions'
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
  ${(props) => props.theme.breakpoints.up('sm')} {
    display: inline;
    color: #707070;
    font-size: ${(props) => props.theme.spacing(2.5)}px;
  }
`)

const StyledPopover = withTheme(styled(Popover)`
  padding: ${(props) => props.theme.spacing(3)}px;
`)

const HeaderHight = withTheme(styled(Box)`
  height: 3vh;
  overflow: visible;
  ${(props) => props.theme.breakpoints.up('sm')} {
    height: 10vh;
  }
`)
const HeaderAppBar = withTheme(styled(AppBar)`
  height: 7vh;
  color: #707070;
  padding-top: ${(props) => props.theme.spacing(2)}px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    height: 10vh;
  }
  MuiPopover-paper {
    top: 0;
  }
`)

const HeaderIconButton = withTheme(styled(IconButton)`
  margin: 0 auto 0 0;
  ${(props) => props.theme.breakpoints.up('sm')} {
    display: none;
  }
`)

const LogoBox = withTheme(styled(Box)`
  display: block;
  margin-left: 0;
  margin-right: auto;
  img {
    width: ${(props) => props.theme.spacing(18)}px;
    ${(props) => props.theme.breakpoints.up('md')} {
      width: ${(props) => props.theme.spacing(30)}px;
    }
  }
`)

const BurgerMenu = withTheme(styled(Menu)``)

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const history = useHistory()
  const userName = useSelector(selectUserName())
  const profilePic = useSelector(selectUserPicture())
  const dispatch = useDispatch()

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <HeaderHight>
      <HeaderAppBar>
        <Toolbar>
          <HeaderIconButton onClick={handleClick}>
            <MenuIcon />
          </HeaderIconButton>
          <BurgerMenu
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
          </BurgerMenu>
          <LogoBox>
            <img src={logo} alt="loading animation" />
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
      </HeaderAppBar>
    </HeaderHight>
  )
}

export default memo(Header)
