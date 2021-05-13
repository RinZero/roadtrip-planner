import React, { memo, useState, useEffect } from 'react'

import { Box, useMediaQuery, useTheme } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { useDispatch, useSelector } from 'react-redux'

import {
  setEditRoadtripStops,
  setMapRoute,
  setMessage,
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
import {
  StyledNewStoppTextField,
  StyledPopover,
  StyledPopoverButton,
  StyledSubmitButton,
} from './style'

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
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
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

  const insertNewStop = async () => {
    const newStopArray = await iterateStops([inputValue], allLocationsArray)
    if (newStopArray.length === 0) {
      dispatch(
        setMessage({
          message: 'Das ist leider kein gültiger Ort!',
        })
      )
      return
    }
    const newStopCoords = newStopArray[0]
    const newStop = await reverseGeocodeHereData(newStopCoords, 'de')
    const newStopItem = newStop.items[0]
    if (usage === 'create') {
      const createobj = {
        address: newStopItem.address.label || newStopItem.title,
        coordinates: [newStopItem.position.lat, newStopItem.position.lng],
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
          mapRoute: mapRoute.concat(createobj.coordinates.toString()),
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
          editRoadtripStops: editRoadtrip.stops.concat([updateObj]),
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
    dispatch(
      setMessage({
        message: 'Der Ort wurde als letzter Stop zu dem Roadtrip hinzugefügt',
      })
    )
    setInputValue('')
  }
  return (
    <PopupState variant="popover" popupId="create-roadtrip-popup-popover">
      {(popupState) => (
        <Box display="flex" alignItems="center" justifyContent="center">
          <div {...bindTrigger(popupState)}>
            <StyledPopoverButton>Ort hinzufügen</StyledPopoverButton>
          </div>
          <StyledPopover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
          >
            <Box
              m={3}
              minWidth={isMobile ? '40vw' : '20vw'}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
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
                  <StyledNewStoppTextField
                    {...params}
                    label={isMobile ? 'Stopp' : 'Neuer Stopp'}
                    name="stop"
                    fullWidth
                    placeholder="Wien"
                  />
                )}
              />
              <StyledSubmitButton onClick={insertNewStop}>
                Hinzufügen
              </StyledSubmitButton>
            </Box>
          </StyledPopover>
        </Box>
      )}
    </PopupState>
  )
}

export default memo(LocationAutocomplete)
