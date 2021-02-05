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
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import {
  setMapRoute,
  setMaxRoadtripStops,
  setProgressStep,
  setRoadtripStops,
  setUiSelectedCategories,
} from '../../store/actions'
import {
  selectRoadtripStops,
  selectMaxRoadtripStops,
  selectUiSelectedCategories,
} from '../../store/selectors'
import { roadtripGenerate } from './raoadtripGenerate'

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
    // dispatch(setRoadtripStops({ roadtripStops }))
    dispatch(setProgressStep({ progressStep: '2' }))
  }

  //TESTS
  // Setup
  dispatch(
    setRoadtripStops({
      roadtripStops: [
        [47.79941, 13.04399, 1.0],
        [46.6357, 14.311817, 2.0],
        [47.416, 15.2617, 3.0],
      ],
    })
  )
  dispatch(setMaxRoadtripStops({ maxRoadtripStops: 10 }))
  dispatch(
    setUiSelectedCategories({
      // eslint-disable-next-line no-octal
      selectedCategories: ['550-5520-0208'],
    })
  )

  const stops = useSelector(selectRoadtripStops())
  const maxStops = useSelector(selectMaxRoadtripStops())
  const categories = useSelector(selectUiSelectedCategories())
  return (
    <>
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
            <Box
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
            >
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
      <Button
        size="large"
        onClick={async () => {
          const response = await roadtripGenerate(stops, maxStops, categories)
          dispatch(setMapRoute({ mapRoute: response }))
          dispatch(setProgressStep({ progressStep: '3' }))
        }}
      >
        Lets go
      </Button>
    </>
  )
}

export default memo(StartGoalForm)
