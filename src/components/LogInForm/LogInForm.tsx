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
import { LocationState, RoadtripState } from '../../store/user/types'
import {
  logIn,
  fetchRoadtrips,
  fetchUserEntries,
} from '../../utils/AuthService'

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

const convertToRoadtrip = (data: Array<unknown>) => {
  // eslint-disable-next-line no-console
  console.log(data)
  const locations: LocationState[] = []
  data.forEach((item: any) => {
    if (item.attributes.user_entry !== null) {
      locations.push(item.attributes.user_entry)
    } else {
      locations.push(item.attributes.api_entry)
    }
  })
  const roadtrip: RoadtripState = {
    stops: locations,
    name: locations[0].name + ' - ' + locations[locations.length - 1].name,
    distance: 0,
  }
  return roadtrip
}
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
      const roadtripsRaw = await fetchRoadtrips(user.token)
      const roadtrips = roadtripsRaw.map((raw: { data: Array<unknown> }) =>
        convertToRoadtrip(raw.data)
      )
      dispatch(getRoadtripsByUserSuccess({ roadtrips: roadtrips }))
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
