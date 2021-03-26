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
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { setProgressStep, setRoadtripStops } from '../../store/actions'
import { selectUserLocations } from '../../store/selectors'
import { autocomplete, iterateStops } from '../../utils/autocomplete'

const StyledForm = withTheme(styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)}px;
  .expand {
    display: block;
  }
  .collapse {
    width: ${(props) => props.theme.spacing(10)}px;
    padding-top: 0px;
    label {
      display: none;
    }
    input {
      font-size: ${(props) => props.theme.spacing(2)}px;
    }
  }
`)

const StyledButton = withTheme(styled(Button)`
  width: 80%;
  color: #ffffff;
  background-color: #71b255;
  padding: ${(props) => props.theme.spacing(2)}px;
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  margin-top: ${(props) => props.theme.spacing(3.75)}px;
`)

const AddButton = withTheme(styled(Button)`
  width: ${(props) => props.theme.spacing(9)}px;
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  padding: ${(props) => props.theme.spacing(2)}px;
  margin: ${(props) => props.theme.spacing(2)}px;
`)

const StyledTextField = withTheme(styled(TextField)`
  padding-bottom: ${(props) => props.theme.spacing(1.25)}px;
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
  margin: ${(props) => props.theme.spacing(2)}px 0;
  input,
  label {
    font-size: ${(props) => props.theme.spacing(3)}px;
    margin-left: ${(props) => props.theme.spacing(3.7)}px;
  }
`)

const FormBox = withTheme(styled(Box)`
  display: block;
  width: 100%;
  ${(props) => props.theme.breakpoints.up('md')} {
    display: flex;
    justify-content: center;
    gap: ${(props) => props.theme.spacing(5)}px;
  }
`)

export const StartGoalForm = () => {
  const dispatch = useDispatch()
  const [active, setActive] = useState(false)
  const { register, getValues } = useForm()
  // Array with the options of autocomplete
  const [array, setArray] = useState([])
  // user messages - wenn zum Beispiel Ort nicht in Österreich oder ungültig
  const [message, setMessage] = useState('')

  //get Location of User
  const userLocations = useSelector(selectUserLocations())

  const getItems = async (inputNew: string, eventType: string) => {
    if (inputNew.length > 2 && eventType !== 'click') {
      const newSet = await autocomplete(inputNew, userLocations)
      setArray(Array.from(newSet))
    } else {
      setArray([])
    }
  }
  function toggleClass(e: any) {
    if (e.key === 'Enter') {
      setActive(!active)
    }
  }
  const [showStop, setShowStop] = React.useState(false)
  const onInput = () => setShowStop(true)

  const defaultProps = {
    options: array,
    forcePopupIcon: false,
    noOptionsText: 'keine Ergebnisse',
    fullWidth: true,
    autoSelect: true,
    freeSolo: true,
  }
  return (
    <>
      <StyledForm>
        <FormBox>
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
                label="Ziel"
                name="stops[4]"
                inputRef={register}
                fullWidth
                placeholder="Graz"
              />
            )}
          />
        </FormBox>

        <Grid container spacing={1} alignItems="center">
          <Typography variant="h6" align="left">
            Stops (optional):
          </Typography>
          <FormBox>
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
                  className={active ? 'collapse' : 'expand'}
                  onKeyDown={toggleClass}
                  label="Zwischenstopp"
                  name="stops[1]"
                  inputRef={register}
                />
              )}
            />
            {showStop ? (
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
                    label="Zwischenstopp"
                    name="stops[2]"
                    inputRef={register}
                  />
                )}
              />
            ) : null}
            <AddButton onClick={onInput}>+</AddButton>
          </FormBox>
          {message ? <h5>{message}</h5> : null}
          <Grid item xs={12} lg={4}>
            <Box p={5}>
              <StyledButton
                onClick={async () => {
                  // get name array with choosen stops
                  const values = getValues()
                  // get coordinates array of the stops
                  const stopArray = await iterateStops(
                    values.stops,
                    userLocations
                  )
                  if (!stopArray[0] || stopArray[0][0] === -1) {
                    setMessage(
                      `Anscheinend stimmt was bei deiner Eingabe nicht.
                      Start und Ziel müssen ausgefüllt sein und die Orte müssen in Österreich existieren. 
                      Thx.`
                    )
                  } else {
                    setMessage('')
                    dispatch(setRoadtripStops({ roadtripStops: stopArray }))
                    dispatch(setProgressStep({ progressStep: '2' }))
                  }
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
