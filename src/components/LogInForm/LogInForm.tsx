import React, { memo } from 'react'

import { Button, Input, Typography, withTheme } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { logInSuccess } from '../../store/actions'
import { logIn, signUp } from '../../utils/AuthService'
import { CreateUser } from '../../utils/CreateUser'
import { FetchUser } from '../../utils/FetchUser'

type IFormInput = {
  username: string
  password: string
}

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
  const onFormSubmit = async (data: IFormInput) => {
    const user = await logIn({
      email: data.username,
      password: data.password,
      password_confirmation: data.password,
    })
    if (user) dispatch(logInSuccess(user))

    // CreateUser()
  }
  return (
    <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
      <Typography variant="h5">LogIn</Typography>
      <StyledInput
        type="text"
        name="username"
        inputRef={register}
        placeholder="Username"
        variant="outlined"
      />
      <StyledInput
        type="password"
        name="password"
        inputRef={register}
        placeholder="Password"
        variant="outlined"
      />
      <Button type="submit" color="primary">
        LogIn
      </Button>
    </StyledForm>
  )
}

export default memo(LogInForm)
