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
import { selectUserLocations, selectRoadtripStops } from '../../store/selectors'
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
  width: 100%;
  color: #ffffff;
  background-color: #71b255;
  padding: ${(props) => props.theme.spacing(2)}px;
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  &:hover,
  &:active {
    background-color: #355727;
  }
`)

const AddButton = withTheme(styled(Button)`
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  padding: ${(props) => props.theme.spacing(2)}px;
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

  const roadtripStops = useSelector(selectRoadtripStops())
  const [optionalStops, setOptionalStops] = useState(
    roadtripStops.slice(0, roadtripStops.length - 1) || [['']]
  )

  const [activeStop, setActiveStop] = useState(1)

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

        <Typography variant="h6" align="left">
          Stops (optional):
        </Typography>
        <Grid container spacing={1} alignItems="center">
          {/* <FormBox>
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
          </FormBox> */}
          {message ? <h5>{message}</h5> : null}

          <Grid item xs={12} lg={8}>
            <Box
              component="div"
              overflow="auto"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {optionalStops.map((stop, index) => {
                if (index !== 0 || roadtripStops.length === 0) {
                  return (
                    <Box
                      mx={1}
                      minWidth={activeStop === index ? '360px' : '70px'}
                    >
                      <Box display={activeStop !== index ? 'none' : 'inline'}>
                        <Autocomplete
                          {...defaultProps}
                          id={'stops[' + (index + 1) + ']'}
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
                              name={'stops[' + (index + 1) + ']'}
                              inputRef={register}
                            />
                          )}
                        />
                      </Box>
                      {activeStop !== index && (
                        <AddButton onClick={() => setActiveStop(index)}>
                          {index + 1}
                        </AddButton>
                      )}
                    </Box>
                  )
                }
              })}
            </Box>
          </Grid>
          <Grid item xs={4} lg={1}>
            <AddButton
              onClick={() => setOptionalStops(optionalStops.concat([[]]))}
            >
              +
            </AddButton>
          </Grid>
          <Grid item xs={12} lg={3}>
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
          </Grid>
        </Grid>
      </StyledForm>
    </>
  )
}

export default memo(StartGoalForm)
