import React, { memo, useState } from 'react'

import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  withTheme,
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import EditRoadtripUpdate from '../../components/EditRoadtripUpdate'
import { selectEditRoadtrip, selectUserToken } from '../../store/selectors'
import { updateRoadtrip } from '../../utils/AuthService'

const EditRoadtripPageStyles = withTheme(styled.div`
  max-width: 70%;
  margin: auto;
  padding: ${(props) => props.theme.spacing(10)}px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`)
const EditRoadtripPage = () => {
  const editRoadtrip = useSelector(selectEditRoadtrip())
  const [isPublic, setIsPublic] = useState(editRoadtrip.public || false)
  const [name, setName] = useState(editRoadtrip.name)
  const [error, setError] = useState('')
  const token = useSelector(selectUserToken())
  const history = useHistory()
  const onUpdate = async () => {
    if (editRoadtrip) {
      const updatedRoadtrip = { ...editRoadtrip, public: isPublic, name: name }

      const result = await updateRoadtrip(updatedRoadtrip, token)
      //TODO ERROR MESSAGE STYLEN - console.log löschen & vlt. history push dann wieder aus else if rausnehmen
      if (typeof result === 'string') {
        setError(result)
        // eslint-disable-next-line no-console
        console.log(result)
      } else if (result === 200) {
        setError('')
        history.push('/profile')
      }
    }
  }
  return (
    <EditRoadtripPageStyles>
      <Box display="flex" justifyContent="space-between" my={2}>
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
      </Box>
      <EditRoadtripUpdate onUpdate={onUpdate} />
    </EditRoadtripPageStyles>
  )
}

export default memo(EditRoadtripPage)
