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
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

// import ImageDropzone from '../../components/ImageDropzone'
import { logInSuccess } from '../../store/actions'
import { selectDropzoneFiles } from '../../store/selectors'
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
  const image = useSelector(selectDropzoneFiles())
  const onFormSubmit = async (data: IFormInput) => {
    const inputData = new FormData()
    inputData.append('[user]username', data.username)
    inputData.append('[user]password', data.password)
    inputData.append('[user]email', data.email)
    inputData.append('[user]password_confirmation', data.password_confirmation)
    if (data.picture) inputData.append('[user]picture', data.picture)
    inputData.append('[user]image', image[0])
    const user = await signUp(inputData)
    if (user) {
      const loggedInUser = await logIn({
        email: user.email,
        password: data.password,
        password_confirmation: data.password,
      })
      if (loggedInUser)
        dispatch(
          logInSuccess(
            Object.assign(loggedInUser, {
              image: user.image === null ? undefined : user.image.url,
            })
          )
        )
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
              inputProps={{ minlength: 3, maxlength: 50, required: true }}
            />
            <StyledInput
              type="email"
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
              placeholder="Passwort"
              variant="outlined"
              inputProps={{ minlength: 6, required: true }}
            />
            <StyledInput
              type="password"
              name="password_confirmation"
              inputRef={register}
              placeholder="Passwort wiederholen"
              variant="outlined"
              inputProps={{ minlength: 6, required: true }}
            />
            <StyledInput
              type="text"
              name="picture"
              inputRef={register}
              placeholder="hier bitte Image-Link einfügen"
              variant="outlined"
            />
            {/* <Box display="flex" alignItems="flex-start" flexDirection="column"> */}
            {/* <Box mb={1}>
                <Typography variant="h6">Profilbild:</Typography>
              </Box> */}
            {/* <ImageDropzone /> */}
            {/* </Box> */}
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
