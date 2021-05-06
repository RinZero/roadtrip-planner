import React, { memo, useState } from 'react'

import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  withTheme,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import EditRoadtripUpdate from '../../components/EditRoadtripUpdate'
import { LocationAutocomplete } from '../../components/LocationAutocomplete'
import { setMessage } from '../../store/actions'
import { selectEditRoadtrip, selectUserToken } from '../../store/selectors'
import { updateRoadtrip } from '../../utils/AuthService'

const EditRoadtripPageStyles = withTheme(styled.div`
  max-width: 70%;
  margin: auto;
  padding: ${(props) => props.theme.spacing(12)}px 0
    ${(props) => props.theme.spacing(10)}px 0;

  ${(props) => props.theme.breakpoints.up('md')} {
    height: calc(100vh - 40px);
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
`)

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
      <Box display="flex" justifyContent="space-between" flexWrap="wrap" my={2}>
        <Box width="80%">
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
      </Box>
      <EditRoadtripUpdate onUpdate={onUpdate} />
    </EditRoadtripPageStyles>
  )
}

export default memo(EditRoadtripPage)
