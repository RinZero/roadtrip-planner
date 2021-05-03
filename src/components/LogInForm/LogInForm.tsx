import React, { memo, useState } from 'react'

import { Button, Input, Typography, withTheme } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { logInSuccess } from '../../store/actions'
import { logIn } from '../../utils/AuthService'
import { initUserData } from '../../utils/initUserData'

type IFormInput = {
  email: string
  password: string
}

const StyledButton = styled(Button)`
  color: #ffffff;
  &:hover,
  &:active {
    background-color: #355727;
  }
`
const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const StyledInput = withTheme(styled(Input)`
  margin-bottom: ${(props) => props.theme.spacing(2)}px;
`)

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
