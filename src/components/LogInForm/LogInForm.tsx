import React, { memo } from 'react'

import { Button, Input, Typography, withTheme } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { logInSuccess } from '../../store/actions'
import { selectUserToken } from '../../store/selectors'
import { logIn, fetchRoadtrips } from '../../utils/AuthService'

type IFormInput = {
  email: string
  password: string
}

const StyledButton = styled(Button)`
  color: #ffffff;
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
  const history = useHistory()
  const token = useSelector(selectUserToken())
  const { register, handleSubmit } = useForm()
  const onFormSubmit = async (data: IFormInput) => {
    const user = await logIn({
      email: data.email,
      password: data.password,
      password_confirmation: data.password,
    })
    if (user) {
      dispatch(logInSuccess(user))
      await fetchRoadtrips(user.token)

      history.push('/')
    }

    // CreateUser()
  }
  return (
    <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
      <Typography variant="h5">LogIn</Typography>
      <StyledInput
        type="text"
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
      <StyledButton type="submit">LogIn</StyledButton>
    </StyledForm>
  )
}

export default memo(LogInForm)
