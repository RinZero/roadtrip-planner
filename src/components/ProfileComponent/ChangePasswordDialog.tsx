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
import { useDispatch, useSelector } from 'react-redux'

import { setMessage } from '../../store/actions'
import { selectUserToken, selectUserId } from '../../store/selectors'
import { editUserPassword } from '../../utils/AuthService'
import { InfoButton } from '../DialogDelete/style'
import { StyledButton } from './style'

const ChangePasswordDialog = () => {
  const token = useSelector(selectUserToken())
  const userId = useSelector(selectUserId())
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const [values, setValues] = useState({
    showPassword: false,
    showPassword2: false,
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

  const changePassword = async () => {
    const inputData = new FormData()
    inputData.append('[user]password', password)
    inputData.append('[user]password_confirmation', passwordConfirmation)
    inputData.append('[user]id', userId)
    handleClose()

    const response = await editUserPassword(inputData, token, userId)
    if (response.status === 200) {
      dispatch(
        setMessage({
          message: 'Dein Passwort wurde geändert.',
          status: 'success',
        })
      )
    } else if (response.status === 422) {
      const arr: Array<Record<string, any>> = []
      response.data.forEach(function (item: Record<string, any>) {
        if (item[1]) {
          arr.push(item[1].pop())
        }
      })
      const str = arr.join(' ')
      dispatch(setMessage({ message: str, status: 'error' }))
    }
  }
  const passwordChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setPassword(value)
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Passwort ändern</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hier kannst du dein Passwort ändern. Gib einfach dein neues Passwort
            inklusive Bestätigung ein.
          </DialogContentText>
          <FormControl>
            <InputLabel>neues Passwort</InputLabel>
            <Input
              name="password"
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
                    {values.showPassword2 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Abbrechen
          </Button>
          <StyledButton onClick={changePassword}>Passwort ändern</StyledButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default memo(ChangePasswordDialog)
