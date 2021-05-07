import { memo, useEffect, useState } from 'react'

import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  withTheme,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import Tutorial from '../../components/Tutorial'
import {
  setMessage,
  setRoadtripStops,
  setRoadtripStopNames,
} from '../../store/actions'
import {
  selectUserLocations,
  selectRoadtripStopNames,
  selectUserHasTutorial,
} from '../../store/selectors'
import { fetchUserEntries } from '../../utils/AuthService'
import { autocomplete, iterateStops } from '../../utils/autocomplete'

const StyledForm = withTheme(styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  const history = useHistory()
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.down(960))
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [active, setActive] = useState(false)
  const { register, getValues } = useForm()
  // Array with the options of autocomplete
  const [array, setArray] = useState([])
  //get Location of User
  const userLocations = useSelector(selectUserLocations())
  const [allLocationsArray, setAllLocationsArray] = useState([])
  const tutorial = useSelector(selectUserHasTutorial())

  useEffect(() => {
    const fetchData = async () => {
      const publicLocations = await fetchUserEntries('')
      const locations = userLocations
        ? userLocations.concat(publicLocations)
        : publicLocations
      setAllLocationsArray(locations)
    }
    fetchData()
  }, [userLocations])

  const getItems = async (inputNew: string, eventType: string) => {
    if (inputNew.length > 2 && eventType !== 'click') {
      const newSet = await autocomplete(inputNew, allLocationsArray)
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
    const stopArrayUnorderd = await iterateStops(
      values.stops,
      allLocationsArray
    )
    //set last Element to goal field
    const lastStop = stopArrayUnorderd.splice(1, 1)
    const stopArray = stopArrayUnorderd.concat(lastStop)
    const nameArray = values.stops

    if (stopArray.length <= 1) {
      dispatch(
        setMessage({
          message: `Du brauchst mindestens 2 Stopps.`,
        })
      )
    } else if (!stopArray[0] || stopArray[0][0] === -1) {
      dispatch(
        setMessage({
          message: `Fehlerhafte Eingabe. 
          Die Orte müssen in Österreich sein.`,
        })
      )
    } else {
      dispatch(setRoadtripStops({ roadtripStops: stopArray }))
      dispatch(setRoadtripStopNames({ roadtripStopNames: nameArray }))
      history.push('/step/:2')
    }
  }
  return (
    <Box my="auto">
      {tutorial[0] ? <Tutorial openBool={tutorial} /> : ''}
      <StyledForm>
        <FormBox id="start_stop">
          <Autocomplete
            {...defaultProps}
            id="stops[0]"
            getOptionLabel={(option) => option}
            inputValue={inputValue[0]}
            onInputChange={(event, newInputValue) => {
              if (event === null) return
              getItems(newInputValue, event.type)

              setInputValue([newInputValue].concat(inputValue.slice(1)))
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
            inputValue={inputValue[1]}
            onInputChange={(event, newInputValue) => {
              if (event === null) return
              getItems(newInputValue, event.type)
              setInputValue(
                inputValue
                  .slice(0, 1)
                  .concat([newInputValue])
                  .concat(inputValue.slice(2, inputValue.length))
              )
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
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box
              component="div"
              overflow="auto"
              display="flex"
              alignItems="center"
              flexWrap={isTablet ? 'wrap' : 'nowrap'}
              justifyContent="flex-start"
            >
              {
                // eslint-disable-next-line array-callback-return
                namedStops.map((stop, index) => {
                  if (index !== 0 && index !== 1) {
                    return (
                      <Box
                        mx={1}
                        my={0.5}
                        minWidth={
                          activeStop === index
                            ? isMobile
                              ? theme.spacing(25) + 'px'
                              : theme.spacing(45) + 'px'
                            : theme.spacing(9) + 'px'
                        }
                      >
                        <Box
                          display={activeStop !== index ? 'none' : 'inline'}
                          id="zwischenstopp"
                        >
                          <Autocomplete
                            {...defaultProps}
                            id={'stops[' + index + ']'}
                            getOptionLabel={(option) => option}
                            inputValue={inputValue[index]}
                            onInputChange={(event, newInputValue) => {
                              if (event === null) return
                              getItems(newInputValue, event.type)
                              setInputValue(
                                inputValue
                                  .slice(0, index)
                                  .concat([newInputValue])
                                  .concat(
                                    inputValue.slice(
                                      index + 1,
                                      inputValue.length
                                    )
                                  )
                              )
                            }}
                            renderInput={(params) => (
                              <StartGoalTextField
                                {...params}
                                className={active ? 'collapse' : 'expand'}
                                onKeyDown={toggleClass}
                                label={
                                  (isMobile ? 'Stopp' : 'Zwischenstopp') +
                                  ' ' +
                                  (index - 1)
                                }
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
          <Grid item xs={12} md={1}>
            <Box display="flex" justifyContent="center">
              <AddButton
                id="more_stops"
                onClick={() => {
                  if (activeStop + 1 < 10) {
                    setNamedStops(namedStops.concat(['']))
                    setActiveStop(namedStops.length)
                  } else
                    dispatch(
                      setMessage({
                        message: 'Es sind nicht mehr als 10 Stopps möglich.',
                      })
                    )
                }}
              >
                {isTablet ? 'Stopp hinzufügen' : '+'}
              </AddButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <StyledButton id="start_button" onClick={() => SubmitForm()}>
              Start
            </StyledButton>
          </Grid>
        </Grid>
      </StyledForm>
    </Box>
  )
}

export default memo(StartGoalForm)
