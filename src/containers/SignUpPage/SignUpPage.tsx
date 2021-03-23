import React, { memo } from 'react'

import {
  Box,
  Button,
  Card,
  Input,
  Typography,
  withTheme,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { logInSuccess } from '../../store/actions'
import { logIn, signUp } from '../../utils/AuthService'

type IFormInput = {
  email: string
  password: string
  password_confirmation: string
  username: string
  picture?: string
}
const StyledInput = withTheme(styled(Input)`
  margin: ${(props) => props.theme.spacing(1.5)}px 0;
  min-width: ${(props) => props.theme.spacing(31)}px;
`)
const LoginButton = withTheme(styled(Button)`
  color: #ffffff;
  margin: auto;
  width: ${(props) => props.theme.spacing(28)}px;
  &:hover {
    background-color: #50803c;
  }
`)
const SignupCard = withTheme(styled(Card)`
  max-width: ${(props) => props.theme.spacing(50)}px;
  padding: ${(props) => props.theme.spacing(3.125)}px;
  margin: ${(props) => props.theme.spacing(10)}px auto;
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
`)

const SignUpPage = () => {
  const { register, handleSubmit } = useForm()
  const history = useHistory()
  const dispatch = useDispatch()
  const onFormSubmit = async (data: IFormInput) => {
    const user = await signUp({ data: { type: 'user', attributes: data } })
    if (user) {
      const loggedInUser = await logIn({
        email: user.email,
        password: data.password,
        password_confirmation: data.password,
      })
      if (loggedInUser) dispatch(logInSuccess(loggedInUser))
    }
    history.push('/')
    // if (user) dispatch(logInSuccess(user))

    // CreateUser()
  }
  return (
    <SignupCard variant="outlined" square>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Box display="grid" justifyContent="center">
          <Typography variant="h1">Account erstellen</Typography>
          <Box margin={3}>
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
              placeholder="Passwort"
              variant="outlined"
            />
            <StyledInput
              type="password"
              name="password_confirmation"
              inputRef={register}
              placeholder="Passwort wiederholen"
              variant="outlined"
            />
            <StyledInput
              type="text"
              name="picture"
              inputRef={register}
              placeholder="Profilbild"
              variant="outlined"
            />
          </Box>
          <LoginButton type="submit" color="primary">
            Registrieren
          </LoginButton>
        </Box>
      </form>
    </SignupCard>
  )
}

export default memo(SignUpPage)
