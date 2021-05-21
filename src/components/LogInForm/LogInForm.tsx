import React, { memo, useState } from 'react'

import { Typography, Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { logInSuccess } from '../../store/actions'
import { logIn } from '../../utils/authenticationService'
import { initUserData } from '../../utils/initUserData'
import { StyledTextfield, StyledForm } from './style'

type IFormInput = {
  email: string
  password: string
}

const LogInForm = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')

  const onFormSubmit = async (data: IFormInput) => {
    const user = await logIn({
      email: data.email,
      password: data.password,
      password_confirmation: data.password,
    })
    if (typeof user === 'string') {
      setError(user)
    } else if (typeof user === 'object' && user.email) {
      setError('')
      user.tutorial = [false, false, false]
      dispatch(logInSuccess(user))
      initUserData(user.token, dispatch)
    }
  }
  return (
    <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
      <Typography variant="h5">LogIn</Typography>
      {error !== '' ? <Typography color="error">{error}</Typography> : ' '}
      <StyledTextfield
        label="Email"
        type="text"
        name="email"
        inputRef={register}
        inputProps={{ type: 'email', required: true }}
      />
      <StyledTextfield
        label="Password"
        type="password"
        name="password"
        inputRef={register}
        inputProps={{ type: 'password', required: true }}
      />
      <Button type="submit">LogIn</Button>
    </StyledForm>
  )
}

export default memo(LogInForm)
