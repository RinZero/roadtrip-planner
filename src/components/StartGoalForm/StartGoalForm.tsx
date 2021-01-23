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

const StyledButton = withTheme(styled(Button)`
  width: 100%;
  color: #ffffff;
  background-color: #71b255;
  padding: ${(props) => props.theme.spacing(2.5)}px;
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
`)

const StyledTextField = withTheme(styled(TextField)`
  margin: 0 ${(props) => props.theme.spacing(2)}px;
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);

  .MuiInput-underline {
    :after {
      content: none;
    }
    :before {
      content: none;
    }
  }
`)

const StartGoalTextField = withTheme(styled(StyledTextField)`
  height: ${(props) => props.theme.spacing(13.5)}px;

  * {
    margin-left: ${(props) => props.theme.spacing(3.7)}px;
    font-size: 40px;
  }
`)

const StopIndicatorTextField = withTheme(styled(StyledTextField)`
  width: ${(props) => props.theme.spacing(8)}px;
  height: ${(props) => props.theme.spacing(8)}px;
`)
type IFormInput = {
  stops: string[]
}

export const StartGoalForm = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const onFormSubmit = (data: IFormInput) => {
    const roadtripStops = data.stops.filter((s) => s !== '')
    dispatch(setRoadtripStops({ roadtripStops }))
  }
  return (
    <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
      <Box display="flex" width="100%" justifyContent="center">
        <StartGoalTextField
          label="Start"
          name="stops[0]"
          inputRef={register}
          fullWidth
          placeholder="Salzburg"
        />
        <StartGoalTextField
          label="Goal"
          name="stops[4]"
          inputRef={register}
          fullWidth
          placeholder="Graz"
        />
      </Box>

      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} lg={8} justify="space-evenly" alignItems="center">
          <Box display="flex" justifyContent="space-evenly" alignItems="center">
            <Typography variant="h6">Stops</Typography>
            <StopIndicatorTextField
              label="1"
              name="stops[1]"
              inputRef={register}
            />
            <StopIndicatorTextField
              label="2"
              name="stops[2]"
              inputRef={register}
            />
            <StopIndicatorTextField
              label="3"
              name="stops[3]"
              inputRef={register}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box p={5}>
            <StyledButton type="submit">Start</StyledButton>
          </Box>
        </Grid>
      </Grid>
    </StyledForm>
  )
}

export default memo(StartGoalForm)
