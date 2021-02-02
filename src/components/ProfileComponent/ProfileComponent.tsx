import React, { memo } from 'react'

import {
  Button,
  Avatar,
  Box,
  Popper,
  withTheme,
  Typography,
  FormControl,
  InputLabel,
  Input,
  IconButton,
  InputAdornment,
  Divider,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import EditIcon from '@material-ui/icons/Edit'
import styled from 'styled-components'

//Art 2
const ProfileBox = withTheme(styled(Box)`
  margin-top: ${(props) => props.theme.spacing(40)}px;
  margin-bottom: ${(props) => props.theme.spacing(7)}px;
`)

const PopperBox = withTheme(styled.form`
  box-shadow: 0px 3px 6px 0px #b1b1b1;
  padding: ${(props) => props.theme.spacing(2)}px;
  background-color: white;
  border-radius: 15px;
`)

const IconBox = withTheme(styled(Box)`
  display: flex;
  justify-content: space-between;
  margin: ${(props) => props.theme.spacing(2.5)}px
    ${(props) => props.theme.spacing(1)}px
    ${(props) => props.theme.spacing(1)}px;
`)

const ProfileAvatar = withTheme(styled(Avatar)`
  width: ${(props) => props.theme.spacing(36)}px;
  height: ${(props) => props.theme.spacing(36)}px;
  display: block;
  margin: 0 auto;
`)

const InfoButton = withTheme(styled(Button)`
  background-color: white;
  box-shadow: 0px 3px 6px 0px #b1b1b1;
  height: ${(props) => props.theme.spacing(5)}px;
  width: ${(props) => props.theme.spacing(10)}px;
  margin-right: ${(props) => props.theme.spacing(0.5)}px;
`)

const EditButton = withTheme(styled(Button)`
  background-color: #71b255;
  box-shadow: 0px 3px 6px 0px #b1b1b1;
  color: white;
  height: ${(props) => props.theme.spacing(5)}px;
  min-width: ${(props) => props.theme.spacing(5)}px;
`)

const ConfirmButton = withTheme(styled(Button)`
  background-color: #71b255;
  box-shadow: 0px 3px 6px 0px #b1b1b1;
  color: white;
  height: ${(props) => props.theme.spacing(5)}px;
  min-width: ${(props) => props.theme.spacing(5)}px;
`)

const ProfileComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: '',
    showPassword: false,
  })

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

  return (
    <>
      <ProfileBox>
        <ProfileAvatar
          alt="profile picture"
          src="https://image.freepik.com/free-photo/mand-holding-cup_1258-340.jpg"
        />
        <Typography variant="h3">Name</Typography>
        <Typography variant="h3">Email</Typography>
        <EditButton aria-describedby={id} type="button" onClick={handleClick}>
          <EditIcon />
        </EditButton>
        <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom">
          <PopperBox>
            <Typography variant="h3">Bearbeiten:</Typography>
            <FormControl>
              <InputLabel>Name</InputLabel>
              <Input id="standard-name" onChange={handleChange('name')} />
            </FormControl>
            <Divider />
            <FormControl>
              <InputLabel>Email</InputLabel>
              <Input id="standard-email" onChange={handleChange('email')} />
            </FormControl>
            <Divider />
            <FormControl>
              <InputLabel>Password</InputLabel>
              <Input
                id="standard-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <IconBox>
              <InfoButton>Profilbild</InfoButton>
              <ConfirmButton type="submit">Speichern</ConfirmButton>
            </IconBox>
          </PopperBox>
        </Popper>
      </ProfileBox>
    </>
  )
}
export default memo(ProfileComponent)
