import React, { memo, useState } from 'react'

import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
  withTheme,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import {
  setProgressStep,
  setRoadtripStops,
  setRoadtripStopNames,
} from '../../store/actions'
import {
  selectUserLocations,
  selectRoadtripStopNames,
} from '../../store/selectors'
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
  const theme = useTheme()
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

  const roadtripStopNames = useSelector(selectRoadtripStopNames())
  const [namedStops, setNamedStops] = useState(
    roadtripStopNames.length > 0 ? roadtripStopNames : ['', '', '']
  )

  const [activeStop, setActiveStop] = useState(2)

  const [inputValue, setInputValue] = useState(namedStops)
  const [value, setValue] = useState<Array<string | null>>(namedStops)
  const defaultProps = {
    options: array,
    forcePopupIcon: false,
    noOptionsText: 'keine Ergebnisse',
    fullWidth: true,
    autoSelect: true,
    freeSolo: true,
    disableClearable: true,
  }

  const SubmitForm = async () => {
    // get name array with choosen stops
    const values = getValues()
    // get coordinates array of the stops
    const stopArrayUnorderd = await iterateStops(values.stops, userLocations)
    //set last Element to goal field
    const lastStop = stopArrayUnorderd.splice(1, 1)
    const stopArray = stopArrayUnorderd.concat(lastStop)
    const nameArray = values.stops

    if (!stopArray[0] || stopArray[0][0] === -1) {
      setMessage(
        `Anscheinend stimmt was bei deiner Eingabe nicht.
          Start und Ziel müssen ausgefüllt sein und die Orte müssen in Österreich existieren. 
          Thx.`
      )
    } else {
      setMessage('')
      dispatch(setRoadtripStops({ roadtripStops: stopArray }))
      dispatch(setRoadtripStopNames({ roadtripStopNames: nameArray }))
      dispatch(setProgressStep({ progressStep: '2' }))
    }
  }
  return (
    <>
      <StyledForm>
        <FormBox>
          <Autocomplete
            {...defaultProps}
            id="stops[0]"
            getOptionLabel={(option) => option}
            value={value[0]}
            inputValue={inputValue[0]}
            onInputChange={(event, newInputValue) => {
              getItems(newInputValue, event.type)
              const newInputValueArray = inputValue
              newInputValueArray[0] = newInputValue
              setInputValue(newInputValueArray)
            }}
            onChange={(event, newValue) => {
              const newValueArray = value
              newValueArray[0] = newValue
              setValue(newValueArray)
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
            id={'stops[' + 1 + ']'}
            getOptionLabel={(option) => option}
            value={value[1]}
            inputValue={inputValue[1]}
            onInputChange={(event, newInputValue) => {
              getItems(newInputValue, event.type)
              const newInputValueArray = inputValue
              newInputValueArray[1] = newInputValue
              setInputValue(newInputValueArray)
            }}
            onChange={(event, newValue) => {
              const newValueArray = value
              newValueArray[1] = newValue
              setValue(newValueArray)
            }}
            renderInput={(params) => (
              <StartGoalTextField
                {...params}
                label="Ziel"
                name={'stops[' + 1 + ']'}
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
          {message ? <h5>{message}</h5> : null}

          <Grid item xs={12} lg={8}>
            <Box
              component="div"
              overflow="auto"
              display="flex"
              alignItems="center"
            >
              {
                // eslint-disable-next-line array-callback-return
                namedStops.map((stop, index) => {
                  if (index !== 0 && index !== 1) {
                    return (
                      <Box
                        mx={1}
                        minWidth={
                          activeStop === index
                            ? theme.spacing(45) + 'px'
                            : theme.spacing(9) + 'px'
                        }
                      >
                        <Box display={activeStop !== index ? 'none' : 'inline'}>
                          <Autocomplete
                            {...defaultProps}
                            id={'stops[' + index + ']'}
                            getOptionLabel={(option) => option}
                            value={value[index] || stop}
                            inputValue={inputValue[index]}
                            onInputChange={(event, newInputValue) => {
                              getItems(newInputValue, event.type)
                              const newInputValueArray = inputValue
                              newInputValueArray[index] = newInputValue
                              setInputValue(newInputValueArray)
                            }}
                            onChange={(event, newValue) => {
                              const newValueArray = value
                              newValueArray[index] = newValue
                              setValue(newValueArray)
                            }}
                            renderInput={(params) => (
                              <StartGoalTextField
                                {...params}
                                className={active ? 'collapse' : 'expand'}
                                onKeyDown={toggleClass}
                                label="Zwischenstopp"
                                name={'stops[' + index + ']'}
                                inputRef={register}
                              />
                            )}
                          />
                        </Box>
                        {activeStop !== index && (
                          <AddButton onClick={() => setActiveStop(index)}>
                            {index - 1}
                          </AddButton>
                        )}
                      </Box>
                    )
                  }
                })
              }
            </Box>
          </Grid>
          <Grid item xs={4} lg={1}>
            <AddButton
              onClick={() => {
                setNamedStops(namedStops.concat(['']))
                setActiveStop(namedStops.length)
              }}
            >
              +
            </AddButton>
          </Grid>
          <Grid item xs={12} lg={3}>
            <StyledButton onClick={() => SubmitForm()}>Start</StyledButton>
          </Grid>
        </Grid>
      </StyledForm>
    </>
  )
}

export default memo(StartGoalForm)
