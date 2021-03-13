import React, { memo } from 'react'

import { Button, Input, Typography, withTheme } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import {
  logInSuccess,
  getRoadtripsByUserSuccess,
  getLocationsByUserSuccess,
} from '../../store/actions'
import { selectUserToken } from '../../store/selectors'
import { LocationState } from '../../store/user/types'
import {
  logIn,
  fetchRoadtrips,
  fetchUserEntries,
} from '../../utils/AuthService'

type IFormInput = {
  username: string
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
      email: data.username,
      password: data.password,
      password_confirmation: data.password,
    })
    if (user) {
      dispatch(logInSuccess(user))
      const roadtrips = await fetchRoadtrips(user.token)
      dispatch(getRoadtripsByUserSuccess(roadtrips))
      const userEntries = await fetchUserEntries(user.token)
      const obj: { locations: LocationState[] } = { locations: [] }
      userEntries.map((entry: { attributes: LocationState }) =>
        obj.locations.push(entry.attributes)
      )
      dispatch(getLocationsByUserSuccess(obj))
      history.push('/')
    }

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
      <StyledButton type="submit">LogIn</StyledButton>
    </StyledForm>
  )
}

export default memo(LogInForm)
