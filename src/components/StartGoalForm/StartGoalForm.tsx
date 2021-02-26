import React, { memo, useState } from 'react'

import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  withTheme,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { setProgressStep, setRoadtripStops } from '../../store/actions'
import { autocomplete, iterateStops } from '../../utils/autocomplete'

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
  padding: ${(props) => props.theme.spacing(2)}px;
  padding-top: 0;
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
  input,
  label {
    font-size: 40px;
    margin-left: ${(props) => props.theme.spacing(3.7)}px;
  }
`)

export const StartGoalForm = () => {
  const dispatch = useDispatch()
  const { register, getValues } = useForm()
  // Array with the options of autocomplete
  const [array, setArray] = useState([])

  const getItems = async (inputNew: string, eventType: string) => {
    if (inputNew.length > 2 && eventType !== 'click') {
      const newSet = await autocomplete(inputNew)
      setArray(Array.from(newSet))
    } else {
      setArray([])
    }
  }

  const defaultProps = {
    options: array,
    forcePopupIcon: false,
    noOptionsText: 'keine Ergebnisse',
    fullWidth: true,
    autoSelect: true,
  }
  return (
    <>
      <StyledForm>
        <Box display="flex" width="100%" justifyContent="center">
          <Autocomplete
            {...defaultProps}
            id="stops[0]"
            getOptionLabel={(option) => option}
            onInputChange={(event, newInputValue) => {
              getItems(newInputValue, event.type)
            }}
            onClose={() => {
              setArray([])
            }}
            renderInput={(params) => (
              <StartGoalTextField
                {...params}
                label="Start"
                name="stops[0]"
                inputRef={register}
                fullWidth
                placeholder="Salzburg"
              />
            )}
          />
          <Autocomplete
            {...defaultProps}
            id="stops[4]"
            getOptionLabel={(option) => option}
            onInputChange={(event, newInputValue) => {
              getItems(newInputValue, event.type)
            }}
            renderInput={(params) => (
              <StartGoalTextField
                {...params}
                label="Goal"
                name="stops[4]"
                inputRef={register}
                fullWidth
                placeholder="Graz"
              />
            )}
          />
        </Box>

        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} lg={8} justify="space-evenly" alignItems="center">
            <Typography variant="h6">Stops (optional)</Typography>
            <Autocomplete
              {...defaultProps}
              id="stops[1]"
              getOptionLabel={(option) => option}
              onInputChange={(event, newInputValue) => {
                getItems(newInputValue, event.type)
              }}
              renderInput={(params) => (
                <StartGoalTextField
                  {...params}
                  label="Zwischenstopp 1"
                  name="stops[1]"
                  inputRef={register}
                />
              )}
            />
            <Autocomplete
              {...defaultProps}
              id="stops[2]"
              getOptionLabel={(option) => option}
              onInputChange={(event, newInputValue) => {
                getItems(newInputValue, event.type)
              }}
              renderInput={(params) => (
                <StartGoalTextField
                  {...params}
                  label="Zwischenstopp 2"
                  name="stops[2]"
                  inputRef={register}
                />
              )}
            />

            <Autocomplete
              {...defaultProps}
              id="stops[3]"
              getOptionLabel={(option) => option}
              onInputChange={(event, newInputValue) => {
                getItems(newInputValue, event.type)
              }}
              renderInput={(params) => (
                <StartGoalTextField
                  {...params}
                  label="Zwischenstopp 3"
                  name="stops[3]"
                  inputRef={register}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box p={5}>
              <StyledButton
                onClick={async () => {
                  // get name array with choosen stops
                  const values = getValues()
                  // get coordinates array of the stops
                  const stopArray = await iterateStops(values.stops)
                  dispatch(setRoadtripStops({ roadtripStops: stopArray }))
                  dispatch(setProgressStep({ progressStep: '2' }))
                }}
              >
                Start
              </StyledButton>
            </Box>
          </Grid>
        </Grid>
      </StyledForm>
    </>
  )
}

export default memo(StartGoalForm)
