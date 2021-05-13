import React, { memo, useState } from 'react'

import { Typography } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { logInSuccess } from '../../store/actions'
import { logIn } from '../../utils/AuthService'
import { initUserData } from '../../utils/initUserData'
import { StyledButton, StyledInput, StyledForm } from './style'

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
      <StyledInput
        type="text"
        name="email"
        inputRef={register}
        placeholder="Email"
        variant="outlined"
        inputProps={{ type: 'email', required: true }}
      />
      <StyledInput
        type="password"
        name="password"
        inputRef={register}
        placeholder="Password"
        variant="outlined"
        inputProps={{ type: 'password', required: true }}
      />
      <StyledButton type="submit">LogIn</StyledButton>
    </StyledForm>
  )
}

export default memo(LogInForm)
