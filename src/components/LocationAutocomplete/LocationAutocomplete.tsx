import React, { memo, useState, useEffect } from 'react'

import { Box, TextField, withTheme, Button, Popover } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import {
  setEditRoadtripStops,
  setMapRoute,
  setRoadtripInfos,
} from '../../store/actions'
import {
  selectRoadtripInfos,
  selectUserLocations,
  selectEditRoadtrip,
  selectMapRoute,
} from '../../store/selectors'
import { LocationState } from '../../store/user/types'
import { fetchUserEntries } from '../../utils/AuthService'
import { autocomplete, iterateStops } from '../../utils/autocomplete'
import { reverseGeocodeHereData } from '../../utils/reverseGeocodeHereData'

const StyledPopover = withTheme(styled(Popover)`
  padding: ${(props) => props.theme.spacing(3)}px;
`)

export type LocationAutocompleteProps = {
  usage: 'update' | 'create'
}
export const LocationAutocomplete = (props: LocationAutocompleteProps) => {
  const { usage } = props
  const [inputValue, setInputValue] = useState('')
  const userLocations = useSelector(selectUserLocations())
  const [array, setArray] = useState([])
  const [allLocationsArray, setAllLocationsArray] = useState([])
  const editRoadtrip = useSelector(selectEditRoadtrip())
  const mapRoute = useSelector(selectMapRoute())
  const tripInfos = useSelector(selectRoadtripInfos())
  const dispatch = useDispatch()

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
                  if (usage === 'create') {
                    const createobj = {
                      address: newStopItem.address.label || newStopItem.title,
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
                        roadtripInfos: tripInfos.concat([createobj]),
                      })
                    )
                    dispatch(
                      setMapRoute({
                        mapRoute: mapRoute.concat(
                          createobj.coordinates.toString()
                        ),
                      })
                    )
                  } else {
                    const updateObj: LocationState = {
                      id: 'new',
                      api_entry_key: newStopItem.id,
                      order: mapRoute.length,
                      latitude: newStopItem.position.lat,
                      longitude: newStopItem.position.lng,
                      name: newStopItem.address.label || newStopItem.title,
                    }
                    dispatch(
                      setEditRoadtripStops({
                        editRoadtripStops: editRoadtrip.stops.concat([
                          updateObj,
                        ]),
                      })
                    )
                    dispatch(
                      setMapRoute({
                        mapRoute: mapRoute.concat([
                          updateObj.latitude + ',' + updateObj.longitude,
                        ]),
                      })
                    )
                  }
                }}
              >
                Submit
              </Button>
            </Box>
          </StyledPopover>
        </div>
      )}
    </PopupState>
  )
}

export default memo(LocationAutocomplete)
