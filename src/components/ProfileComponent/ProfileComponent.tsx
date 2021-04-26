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
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import EditIcon from '@material-ui/icons/Edit'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { logOutSuccess, updateUser } from '../../store/actions'
import {
  selectUserPicture,
  selectUserEmail,
  selectUserName,
  selectUserToken,
  selectUserId,
} from '../../store/selectors'
import { editUser, deleteUser } from '../../utils/AuthService'

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

const InputLink = withTheme(styled(Input)`
  width: 100%;
`)

const ProfileComponent = () => {
  const token = useSelector(selectUserToken())
  const userId = useSelector(selectUserId())
  const name = useSelector(selectUserName())
  const email = useSelector(selectUserEmail())
  const profilePic = useSelector(selectUserPicture())

  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null)
  const [id, setId] = useState<string | undefined>(undefined)
  const [values, setValues] = useState({
    showPassword: false,
    showPassword2: false,
    open: false,
    openDelete: false,
  })

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
    setValues({ ...values, open: !values.open })
    setId(values.open ? 'simple-popper' : undefined)
  }

  const handleClickAway = () => {
    setValues({ ...values, open: false })
    setAnchorEl(null)
    setId(values.open ? 'simple-popper' : undefined)
  }

  const handleClickOpenDelete = () => {
    setValues({ ...values, openDelete: true })
  }

  const handleCloseDelete = () => {
    setValues({ ...values, openDelete: false })
  }

  const handleDelete = async () => {
    const response = await deleteUser(token, (userId as unknown) as number)
    if (response.status && response.status === 204) {
      dispatch(
        updateUser({
          userName: '',
          email: '',
          password: '',
          picture: '',
        })
      )
      handleCloseDelete()
      dispatch(logOutSuccess())
      history.push('/')
    }
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent) => {
    event.preventDefault()
  }

  const handleClickShowPassword2 = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }

  const handleMouseDownPassword2 = (event: MouseEvent) => {
    event.preventDefault()
  }

  type IFormInput = {
    userName: string
    email: string
    password: string
    password_confirmation: string
    picture: string
  }

  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const onFormSubmit = async (data: IFormInput) => {
    const user = {
      username: data.userName,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      is_admin: false,
      picture: data.picture,
      // image: '',
      id: (userId as unknown) as number,
    }

    const response = await editUser(user, token)
    if (response === 'Dein Profil wurde bearbeitet!') {
      dispatch(
        updateUser({
          userName: data.userName,
          email: data.email,
          password: data.password,
          // TODO: image upload, image link should be possible in edit
          picture: data.picture,
          // image: data.image,
        })
      )
    }
    //close popup
    handleClickAway()
  }

  return (
    <>
      <ProfileBox>
        <ProfileAvatar alt="Profilbild" src={profilePic} />
        <Typography variant="h3">{name}</Typography>
        <Typography variant="h3">{email}</Typography>
        <EditButton
          aria-describedby={id}
          aria-label="edit"
          type="button"
          onClick={handleClick}
        >
          <EditIcon />
        </EditButton>
        <Popper
          id={id}
          open={values.open}
          anchorEl={anchorEl}
          placement="bottom"
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            <PopperBox onSubmit={handleSubmit(onFormSubmit)}>
              <Typography variant="h3">Bearbeiten:</Typography>
              <FormControl>
                <InputLabel>Name</InputLabel>
                <Input
                  name="userName"
                  inputRef={register}
                  defaultValue={name}
                  inputProps={{ minlength: 3, maxlength: 50, required: true }}
                />
              </FormControl>
              <Divider />
              <FormControl>
                <InputLabel>E-Mail</InputLabel>
                <Input
                  name="email"
                  inputRef={register}
                  defaultValue={email}
                  inputProps={{ type: 'email', required: true }}
                />
              </FormControl>
              <Divider />
              <FormControl>
                <InputLabel>Passwort</InputLabel>
                <Input
                  name="password"
                  inputRef={register}
                  type={values.showPassword ? 'text' : 'password'}
                  inputProps={{ minlength: 6, required: true }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Divider />
              <FormControl>
                <InputLabel>Passwort Bestätigung</InputLabel>
                <Input
                  name="password_confirmation"
                  inputRef={register}
                  type={values.showPassword2 ? 'text' : 'password'}
                  inputProps={{ minlength: 6, required: true }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword2}
                      >
                        {values.showPassword2 ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Divider />
              <FormControl>
                <InputLabel>Bild Link</InputLabel>
                <InputLink
                  type="text"
                  name="picture"
                  inputRef={register}
                  placeholder="hier Bild-Link einfügen"
                  defaultValue={profilePic}
                />
              </FormControl>
              <Divider />

              <IconBox>
                <InfoButton onClick={handleClickOpenDelete}>
                  Profil löschen
                </InfoButton>
                <ConfirmButton type="submit">Speichern</ConfirmButton>
              </IconBox>

              <Dialog
                open={values.openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Willst du dein Profil wirklich löschen?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Das Löschen deines Profils kann nicht mehr rückgängig
                    gemacht werden. Damit gehen auch deine erstellten Roadtrips
                    und Orte verloren.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <InfoButton onClick={handleCloseDelete}>Abbrechen</InfoButton>
                  <InfoButton onClick={handleDelete} color="secondary">
                    Löschen
                  </InfoButton>
                </DialogActions>
              </Dialog>
            </PopperBox>
          </ClickAwayListener>
        </Popper>
      </ProfileBox>
    </>
  )
}
export default memo(ProfileComponent)
