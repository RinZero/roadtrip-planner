import React, { memo } from 'react'

import { Box, Typography } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import ImageDropzone from '../../components/ImageDropzone'
import { logInSuccess, setMessage } from '../../store/actions'
import { selectDropzoneFiles } from '../../store/selectors'
import { logIn, signUp } from '../../utils/AuthService'
import { StyledInput, LoginButton, SignupCard } from './style'

type IFormInput = {
  email: string
  password: string
  password_confirmation: string
  username: string
}

const SignUpForm = () => {
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
    inputData.append('[user]image', image[0])
    const response = await signUp(inputData)

    if ((response.status as number) === 200) {
      const loggedInUser = await logIn({
        email: data.email,
        password: data.password,
        password_confirmation: data.password,
      })
      if (loggedInUser)
        dispatch(
          logInSuccess(
            Object.assign(loggedInUser, {
              image:
                response.data.image === null
                  ? undefined
                  : response.data.image.url,
              tutorial: [true, true, true],
            })
          )
        )
      dispatch(setMessage({ message: 'Dein Profil wurde erstellt.' }))
      history.push('/')
    } else {
      const arr: Array<Record<string, any>> = []
      response.data.forEach(function (item: Record<string, any>) {
        if (item[1]) {
          arr.push(item[1].pop())
        }
      })
      const str = arr.join(' ')
      dispatch(setMessage({ message: str }))
    }
  }
  return (
    <SignupCard variant="outlined" square>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Box display="grid" justifyContent="center">
          <Typography variant="h1">Steig ein!</Typography>
          <Box>
            <StyledInput
              label="Username *"
              type="text"
              name="username"
              inputRef={register}
              inputProps={{ minlength: 3, maxlength: 50, required: true }}
            />
            <StyledInput
              label="Email *"
              type="email"
              name="email"
              inputRef={register}
              inputProps={{ type: 'email', required: true }}
            />
            <StyledInput
              label="Passwort *"
              type="password"
              name="password"
              inputRef={register}
              inputProps={{ minlength: 8, required: true }}
            />
            <StyledInput
              label="Passwort wiederholen *"
              type="password"
              name="password_confirmation"
              inputRef={register}
              inputProps={{ minlength: 6, required: true }}
            />
            <Box
              mt={2}
              display="flex"
              alignItems="flex-start"
              flexDirection="column"
            >
              <Box mb={1}>
                <Typography variant="h6">Profilbild:</Typography>
              </Box>
              <ImageDropzone />
            </Box>
          </Box>
          <Box marginY={2}>
            <Typography color="secondary" variant="body1">
              Felder mit * sind Pflichtfelder
            </Typography>
          </Box>
          <LoginButton type="submit" color="primary">
            Registrieren
          </LoginButton>
        </Box>
      </form>
    </SignupCard>
  )
}

export default memo(SignUpForm)
