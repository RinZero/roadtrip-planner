import React, { memo } from 'react'

import { Button, Input, Typography, withTheme } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { signUp } from '../../utils/AuthService'

type IFormInput = {
  email: string
  password: string
  password_confirmation: string
  username: string
  picture?: string
}
const StyledInput = withTheme(styled(Input)`
  margin-bottom: ${(props) => props.theme.spacing(2)}px;
`)

const SignUpPage = () => {
  const { register, handleSubmit } = useForm()
  const history = useHistory()
  const onFormSubmit = async (data: IFormInput) => {
    const user = await signUp({ data: { type: 'user', attributes: data } })
    history.push('/')
    // if (user) dispatch(logInSuccess(user))

    // CreateUser()
  }
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Typography variant="h1">Anmeldung</Typography>
      <StyledInput
        type="text"
        name="username"
        inputRef={register}
        placeholder="Username"
        variant="outlined"
      />
      <StyledInput
        type="email"
        name="email"
        inputRef={register}
        placeholder="Email"
        variant="outlined"
      />
      <StyledInput
        type="password"
        name="password"
        inputRef={register}
        placeholder="Password"
        variant="outlined"
      />
      <StyledInput
        type="password"
        name="password_confirmation"
        inputRef={register}
        placeholder="Confirm Password"
        variant="outlined"
      />
      <StyledInput
        type="text"
        name="picture"
        inputRef={register}
        placeholder="Profile Picture"
        variant="outlined"
      />
      <Button type="submit" color="primary">
        LogIn
      </Button>
    </form>
  )
}

export default memo(SignUpPage)
