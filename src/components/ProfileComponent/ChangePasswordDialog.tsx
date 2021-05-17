import React, { MouseEvent, useState, memo, ChangeEvent } from 'react'

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { setMessage } from '../../store/actions'
import { selectUserToken, selectUserId } from '../../store/selectors'
import { editUserPassword } from '../../utils/AuthService'
import { InfoButton } from '../DialogDelete/style'
import { StyledButton } from './style'

type IFormInput = {
  password: string
  password_confirmation: string
}

const ChangePasswordDialog = () => {
  const token = useSelector(selectUserToken())
  const userId = useSelector(selectUserId())
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, setValue } = useForm()
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const [values, setValues] = useState({
    showPassword: false,
    showPassword2: false,
    open: false,
  })
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
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

  // const onFormSubmit = async (data: IFormInput) => {
  const onFormSubmit = async () => {
    // eslint-disable-next-line no-console
    // console.log(data.password_confirmation)

    const inputData = new FormData()
    // inputData.append('[user]password', data.password)
    // inputData.append('[user]password_confirmation', data.password_confirmation)
    inputData.append('[user]password', password)
    inputData.append('[user]password_confirmation', passwordConfirmation)
    inputData.append('[user]id', userId)

    // eslint-disable-next-line no-console
    console.log(password)
    // eslint-disable-next-line no-console
    console.log(inputData)
    handleClose()

    const response = await editUserPassword(inputData, token, userId)
    // eslint-disable-next-line no-console
    console.log(response)
    if (response.status === 200) {
      // eslint-disable-next-line no-console
      console.log('worked')
      dispatch(
        setMessage({
          message: 'Dein Passwort wurde geändert',
        })
      )
    } else {
      // eslint-disable-next-line no-console
      console.log('nop')
      dispatch(
        setMessage({
          message: 'Es gab ein Problem beim ändern deines Passworts',
        })
      )
    }
  }
  const passwordChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setPassword(value)
    // return value
  }
  const passwordConfirmationChanged = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    setPasswordConfirmation(value)
  }

  return (
    <>
      <InfoButton color="primary" onClick={handleClickOpen}>
        Passwort ändern
      </InfoButton>

      {/* <Button onClick={handleClickOpen}>Passwort ändern</Button> */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Passwort ändern</DialogTitle>
        <form>
          <DialogContent>
            <DialogContentText>
              Hier kannst du dein Passwort ändern. Gib einfach dein neues
              Passwort inklusive Bestätigung ein.
            </DialogContentText>
            <FormControl>
              <InputLabel>neues Passwort</InputLabel>
              <Input
                name="password"
                // inputRef={register}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  passwordChanged(e)
                }}
                value={password}
                type={values.showPassword ? 'text' : 'password'}
                inputProps={{ minlength: 6, required: true }}
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
            <FormControl>
              <InputLabel>neues Passwort Bestätigung</InputLabel>
              <Input
                name="password_confirmation"
                // inputRef={register}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  passwordConfirmationChanged(e)
                }}
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
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <StyledButton onClick={onFormSubmit}>Speichern</StyledButton>
            {/* <StyledButton onClick={onFormSubmit}>Speichern</StyledButton> */}
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default memo(ChangePasswordDialog)
