import React, { memo, useState } from 'react'

import { Box, FormControlLabel, Switch, TextField } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { StyledOptionContainer } from '../../components/EditRoadtripCreation'
import EditRoadtripUpdate from '../../components/EditRoadtripUpdate'
import { LocationAutocomplete } from '../../components/LocationAutocomplete'
import { setMessage } from '../../store/actions'
import { selectEditRoadtrip, selectUserToken } from '../../store/selectors'
import { updateRoadtrip } from '../../utils/AuthService'
import { EditRoadtripPageStyles } from './style'

const EditRoadtripPage = () => {
  const editRoadtrip = useSelector(selectEditRoadtrip())
  const [isPublic, setIsPublic] = useState(editRoadtrip.public || false)
  const [name, setName] = useState(editRoadtrip.name)
  const token = useSelector(selectUserToken())
  const history = useHistory()
  const dispatch = useDispatch()

  const onUpdate = async () => {
    if (editRoadtrip) {
      const updatedRoadtrip = { ...editRoadtrip, public: isPublic, name: name }

      const result = await updateRoadtrip(updatedRoadtrip, token)
      if (typeof result === 'string') {
        dispatch(setMessage({ message: result }))
      } else if (result === 200) {
        history.push('/profile')
      }
    }
  }
  return (
    <EditRoadtripPageStyles>
      <StyledOptionContainer>
        <Box width="65%">
          <TextField
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
        <LocationAutocomplete usage="update" />
      </StyledOptionContainer>
      <EditRoadtripUpdate onUpdate={onUpdate} />
    </EditRoadtripPageStyles>
  )
}

export default memo(EditRoadtripPage)
