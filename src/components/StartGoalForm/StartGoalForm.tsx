import React, { memo } from 'react'

import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  withTheme,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { setRoadtripStops } from '../../store/actions'

const StyledForm = withTheme(styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)}px;
`)
type IFormInput = {
  stops: string[]
}

export const StartGoalForm = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const onFormSubmit = (data: IFormInput) => {
    // eslint-disable-next-line no-console
    console.log(data)
    const roadtripStops = data.stops.filter((s) => s !== '')
    // eslint-disable-next-line no-console
    console.log(roadtripStops)
    dispatch(setRoadtripStops({ roadtripStops }))
  }
  return (
    <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
      <Box display="flex" justifyContent="space-between">
        <TextField
          label="Start"
          variant="outlined"
          name="stops[0]"
          inputRef={register}
        />
        <TextField
          label="Goal"
          variant="outlined"
          name="stops[4]"
          inputRef={register}
        />
      </Box>

      <Grid container spacing={1}>
        <Grid item xs={12} lg={8}>
          <Typography variant="h6">Stops</Typography>
          <TextField
            label="1"
            variant="outlined"
            name="stops[1]"
            inputRef={register}
          />
          <TextField
            label="2"
            variant="outlined"
            name="stops[2]"
            inputRef={register}
          />
          <TextField
            label="3"
            variant="outlined"
            name="stops[3]"
            inputRef={register}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Button variant="contained" color="primary" type="submit">
            Start
          </Button>
        </Grid>
      </Grid>
    </StyledForm>
  )
}

export default memo(StartGoalForm)
