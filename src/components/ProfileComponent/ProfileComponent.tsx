import React, { MouseEvent, useState, memo } from 'react'

import {
  Box,
  Popper,
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
  Link,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import EditIcon from '@material-ui/icons/Edit'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useHistory } from 'react-router-dom'

import { logOutSuccess, updateUser, setMessage } from '../../store/actions'
import {
  selectUserPicture,
  selectUserEmail,
  selectUserName,
  selectUserToken,
  selectUserId,
  selectUserIsAdmin,
  selectDropzoneFiles,
} from '../../store/selectors'
import { editUser, deleteUser } from '../../utils/AuthService'
import ImageDropzone from '../ImageDropzone'
import {
  ProfileBox,
  PopperBox,
  IconBox,
  ProfileAvatar,
  TypographyMarginSmall,
  InfoButton,
  EditButton,
  ConfirmButton,
} from './style'

const ProfileComponent = () => {
  const token = useSelector(selectUserToken())
  const userId = useSelector(selectUserId())
  const name = useSelector(selectUserName())
  const email = useSelector(selectUserEmail())
  const profilePic = useSelector(selectUserPicture())
  const isAdmin = useSelector(selectUserIsAdmin())

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
    image: (File & {
      preview: string
    })[]
  }

  const dispatch = useDispatch()
  const image = useSelector(selectDropzoneFiles())

  const { register, handleSubmit } = useForm()
  const onFormSubmit = async (data: IFormInput) => {
    const inputData = new FormData()
    inputData.append('[user]username', data.userName)
    inputData.append('[user]password', data.password)
    inputData.append('[user]email', data.email)
    inputData.append('[user]password_confirmation', data.password_confirmation)
    inputData.append('[user]image', image[0])
    inputData.append('[user]id', userId)

    const response = await editUser(inputData, token, userId)
    if (response.status === 200) {
      dispatch(
        updateUser({
          userName: data.userName,
          email: data.email,
          password: data.password,
          picture:
            response.data.data.attributes.image === null
              ? undefined
              : response.data.data.attributes.image?.url,
        })
      )
      dispatch(setMessage({ message: 'Dein Profil wurde bearbeitet.' }))
    } else {
      // TODO JULIA: Fehlermeldungen aus dem Backend
      dispatch(
        setMessage({
          message: 'Dein Profil konnte leider nicht bearbeitet werden.',
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
        <TypographyMarginSmall variant="h3">{email}</TypographyMarginSmall>
        <EditButton
          aria-describedby={id}
          aria-label="edit"
          type="button"
          onClick={handleClick}
        >
          <EditIcon />
        </EditButton>
        {isAdmin ? (
          <>
            <Link component={RouterLink} to={`/admin`} variant="h6">
              Admin
            </Link>
          </>
        ) : (
          ''
        )}
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
              <Box
                display="flex"
                alignItems="flex-start"
                flexDirection="column"
              >
                <Box mb={1}>
                  <Typography variant="h6">Profilbild:</Typography>
                </Box>
                <ImageDropzone />
              </Box>

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
