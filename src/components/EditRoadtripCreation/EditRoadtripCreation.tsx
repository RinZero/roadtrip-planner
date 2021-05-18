import { memo, useCallback, useState } from 'react'

import { Box, FormControlLabel, Switch, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { LocationAutocomplete } from '../../components/LocationAutocomplete'
import Tutorial from '../../components/Tutorial'
import {
  setMapRoute,
  setMessage,
  setRoadtripInfos,
  setIsGenerated,
} from '../../store/actions'
import {
  selectRoadtripInfos,
  selectUserToken,
  selectUserHasTutorial,
} from '../../store/selectors'
import { createRoadtrip, createRoadtripType } from '../../utils/AuthService'
import EditRoadtripTemplate from '../EditRoadtripTemplate'
import { CreateRoadtripPageStyles, StyledOptionContainer } from './style'

const EditRoadtripCreation = () => {
  const dispatch = useDispatch()
  const history = useHistory()
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
      dispatch(setMessage({ message: result, status: 'error' }))
    } else if (typeof result === 'object' && result.type) {
      dispatch(setIsGenerated({ isGenerated: true }))
      history.push('/step/:4')
    }
  }, [name, isPublic, roadtripInfo, token, dispatch, history])

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
  return (
    <>
      {tutorial[2] ? <Tutorial openBool={tutorial} /> : ''}
      <CreateRoadtripPageStyles>
        <StyledOptionContainer>
          <Box width="65%">
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
          <LocationAutocomplete usage="create" />
        </StyledOptionContainer>
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
