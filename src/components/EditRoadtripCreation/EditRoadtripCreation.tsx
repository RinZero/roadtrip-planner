import React, { memo, useCallback, useEffect, useState } from 'react'

import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  withTheme,
  Button,
  Popover,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import Tutorial from '../../components/Tutorial'
import {
  setEditRoadtripStops,
  setMapRoute,
  setMessage,
  setProgressStep,
  setRoadtripInfos,
} from '../../store/actions'
import {
  selectRoadtripInfos,
  selectUserToken,
  selectUserHasTutorial,
  selectUserLocations,
  selectEditRoadtrip,
  selectMapRoute,
} from '../../store/selectors'
import {
  createRoadtrip,
  createRoadtripType,
  fetchUserEntries,
} from '../../utils/AuthService'
import { autocomplete, iterateStops } from '../../utils/autocomplete'
import { reverseGeocodeHereData } from '../../utils/reverseGeocodeHereData'
import EditRoadtripTemplate from '../EditRoadtripTemplate'

const CreateRoadtripPageStyles = withTheme(styled.div`
  max-width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`)
const StyledPopover = withTheme(styled(Popover)`
  padding: ${(props) => props.theme.spacing(3)}px;
`)

const EditRoadtripCreation = () => {
  const dispatch = useDispatch()
  const roadtripInfo = useSelector(selectRoadtripInfos())
  const dndStateOrder = [
    {
      address: '',
      categories: { id: '', name: '' },
      coordinates: [0, 0],
      api_key: '',
    },
  ]
  const token = useSelector(selectUserToken())
  const tutorial = useSelector(selectUserHasTutorial())
  const [isPublic, setIsPublic] = useState(false)
  const [name, setName] = useState('Mein Roadtrip')
  const [inputValue, setInputValue] = useState('')
  const userLocations = useSelector(selectUserLocations())
  const [array, setArray] = useState([])
  const [allLocationsArray, setAllLocationsArray] = useState([])
  const editRoadtrip = useSelector(selectEditRoadtrip())
  const mapRoute = useSelector(selectMapRoute())
  const tripInfos = useSelector(selectRoadtripInfos())
  const submitRoadtrip = useCallback(async () => {
    const roadtripData: createRoadtripType = {
      data: {
        type: 'roadtrip',
        locations: [],
        attributes: {
          name: name,
          public: isPublic,
          distance: 1,
        },
      },
    }
    roadtripInfo.forEach((info) => {
      //TODO if check between api and user entries
      if (info.entry) {
        // User Entry
        roadtripData.data.locations.push({
          api_entry: undefined,
          user_entry: info.entry,
        })
      } else {
        // APi entry
        roadtripData.data.locations.push({
          api_entry: { api_entry_key: info.api_key },
          user_entry: undefined,
        })
      }
    })

    const result = await createRoadtrip(roadtripData, token)
    if (typeof result === 'string') {
      dispatch(setMessage({ message: result }))
    } else if (typeof result === 'object' && result.type) {
      dispatch(setProgressStep({ progressStep: '4' }))
    }
  }, [roadtripInfo, token, dispatch, isPublic, name])

  const onChange = (r: Array<Record<string, any>>) => {
    dispatch(
      setRoadtripInfos({
        roadtripInfos: r as {
          address: string
          categories: {
            id: string
            name: string
            primary?: boolean | undefined
          }
          coordinates: number[]
          api_key: string
        }[],
      })
    )
    dispatch(
      setMapRoute({
        mapRoute: r.map(
          (stop) => stop.coordinates[0] + ',' + stop.coordinates[1]
        ),
      })
    )
  }
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
  const defaultProps = {
    options: array,
    forcePopupIcon: false,
    noOptionsText: 'keine Ergebnisse',
    fullWidth: true,
    autoSelect: true,
    freeSolo: true,
    disableClearable: true,
  }
  return (
    <>
      {tutorial[2] ? <Tutorial openBool={tutorial} /> : ''}
      <CreateRoadtripPageStyles>
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          my={2}
        >
          <Box width="80%">
            <TextField
              id="input_name_roadtrip"
              value={name}
              variant="outlined"
              label="Roadtrip-Name"
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <FormControlLabel
            control={
              <Switch
                checked={isPublic}
                onChange={() => setIsPublic(!isPublic)}
                name="isPublic"
                color="primary"
              />
            }
            label="öffentlich"
          />
          <PopupState variant="popover" popupId="create-roadtrip-popup-popover">
            {(popupState) => (
              <div>
                <div {...bindTrigger(popupState)}>
                  <Button>Ort hinzufügen</Button>
                </div>
                <StyledPopover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <Box m={3} width="30vw">
                    <Autocomplete
                      {...defaultProps}
                      id="stop"
                      inputValue={inputValue}
                      getOptionLabel={(option) => option}
                      onInputChange={(event, newInputValue) => {
                        if (event !== null) {
                          getItems(newInputValue, event.type)
                          setInputValue(newInputValue)
                        }
                      }}
                      onClose={() => {
                        setArray([])
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Neuer Stopp"
                          name="stop"
                          fullWidth
                          placeholder="Wien"
                        />
                      )}
                    />
                    <Button
                      onClick={async () => {
                        const newStopArray = await iterateStops(
                          [inputValue],
                          allLocationsArray
                        )
                        // eslint-disable-next-line no-console
                        console.log(newStopArray)
                        const newStopCoords = newStopArray[0]
                        const newStop = await reverseGeocodeHereData(
                          newStopCoords,
                          'de'
                        )
                        const newStopItem = newStop.items[0]

                        const obj = {
                          address:
                            newStopItem.address.label || newStopItem.title,
                          coordinates: [
                            newStopItem.position.lat,
                            newStopItem.position.lng,
                          ],
                          categories: newStopItem.categories,
                          api_key: newStopItem.id,
                          entry: newStopItem.entry,
                        }
                        dispatch(
                          setRoadtripInfos({
                            roadtripInfos: tripInfos.concat([obj]),
                          })
                        )
                        dispatch(
                          setMapRoute({
                            mapRoute: mapRoute.concat(
                              obj.coordinates.toString()
                            ),
                          })
                        )
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </StyledPopover>
              </div>
            )}
          </PopupState>
        </Box>
        <EditRoadtripTemplate
          dndStateOrder={dndStateOrder}
          onChange={onChange}
          onSave={submitRoadtrip}
          listInfo={roadtripInfo}
        />
      </CreateRoadtripPageStyles>
    </>
  )
}
export default memo(EditRoadtripCreation)
