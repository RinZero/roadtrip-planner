import { memo, useEffect, useState } from 'react'

import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

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
  selectUserName,
} from '../../store/selectors'
import { fetchUserEntries } from '../../utils/AuthService'
import { autocomplete, iterateStops } from '../../utils/autocomplete'
import {
  StyledButton,
  StyledForm,
  AddButton,
  FormBox,
  StartGoalTextField,
} from './style'

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

  const roadtripStopNames = useSelector(selectRoadtripStopNames())
  const userName = useSelector(selectUserName())
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
          status: 'error',
        })
      )
    } else if (!stopArray[0] || stopArray[0][0] === -1) {
      dispatch(
        setMessage({
          message: `Fehlerhafte Eingabe. 
          Die Orte müssen in Österreich sein.`,
          status: 'error',
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
                          <AddButton
                            color="primary"
                            onClick={() => setActiveStop(index)}
                          >
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
                color="primary"
                id="more_stops"
                onClick={() => {
                  if (activeStop + 1 < 10) {
                    setNamedStops(namedStops.concat(['']))
                    setActiveStop(namedStops.length)
                  } else
                    dispatch(
                      setMessage({
                        message: 'Es sind nicht mehr als 10 Stopps möglich.',
                        status: 'error',
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
      {userName === 'Guest' && (
        <Box mt={1}>
          <Typography align="center" variant="h6" color="secondary">
            Um deinen erstellten Roadtrip speichern zu können, musst du
            angemeldet sein.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default memo(StartGoalForm)
