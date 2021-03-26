import React, { MouseEvent, useState, memo } from 'react'

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
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { updateUser } from '../../store/actions'
import {
  selectUserPicture,
  selectUserEmail,
  selectUserName,
} from '../../store/selectors'

//Art 2
const ProfileBox = withTheme(styled(Box)`
  margin-top: ${(props) => props.theme.spacing(10)}px;
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
  &:hover,
  &:active {
    background-color: #355727;
  }
`)

const ConfirmButton = withTheme(styled(Button)`
  background-color: #71b255;
  box-shadow: 0px 3px 6px 0px #b1b1b1;
  color: white;
  height: ${(props) => props.theme.spacing(5)}px;
  min-width: ${(props) => props.theme.spacing(5)}px;
  &:hover,
  &:active {
    background-color: #355727;
  }
`)

const ProfileComponent = () => {
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined
  const [values, setValues] = React.useState({
    showPassword: false,
  })

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent) => {
    event.preventDefault()
  }

  type IFormInput = {
    userName: string
    email: string
    password: string
    image: string
  }

  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      image: '',
    },
  })
  const onFormSubmit = (data: IFormInput) => {
    dispatch(
      updateUser({
        userName: data.userName,
        email: data.email,
        password: data.password,
        image: data.image,
      })
    )
  }

  const name = useSelector(selectUserName())
  const email = useSelector(selectUserEmail())
  const profilePic = useSelector(selectUserPicture())
  return (
    <>
      <ProfileBox>
        <ProfileAvatar alt="profile picture" src={profilePic} />
        <Typography variant="h3">{name}</Typography>
        <Typography variant="h3">{email}</Typography>
        <EditButton aria-describedby={id} type="button" onClick={handleClick}>
          <EditIcon />
        </EditButton>
        <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom">
          <PopperBox>
            <Typography variant="h3">Bearbeiten:</Typography>
            <FormControl>
              <InputLabel>Name</InputLabel>
              <Input name="userName" ref={register} />
            </FormControl>
            <Divider />
            <FormControl>
              <InputLabel>Email</InputLabel>
              <Input name="email" ref={register} />
            </FormControl>
            <Divider />
            <FormControl>
              <InputLabel>Password</InputLabel>
              <Input
                name="password"
                ref={register}
                type={values.showPassword ? 'text' : 'password'}
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
              <ConfirmButton
                type="submit"
                onSubmit={handleSubmit(onFormSubmit)}
              >
                Speichern
              </ConfirmButton>
            </IconBox>
          </PopperBox>
        </Popper>
      </ProfileBox>
    </>
  )
}
export default memo(ProfileComponent)
