import React, { memo } from 'react'

import { List, ListItemText, IconButton, Box } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import {
  selectUserLocations,
  selectUserToken,
  selectUserId,
} from '../../store/selectors'
import { deletePlace } from '../../utils/CreateNewPlace'
import { initUserData } from '../../utils/initUserData'
import { LocationBox, LocationListItem } from './style'

export const LocationList = () => {
  const locations = useSelector(selectUserLocations())
  const token = useSelector(selectUserToken())
  const userID = (useSelector(selectUserId()) as unknown) as number
  const dispatch = useDispatch()

  return (
    <LocationBox>
      <List>
        {locations?.map((location) => {
          if (location.user_id === userID)
            return (
              <LocationListItem button key={location.id}>
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Box display="flex" flexDirection="column">
                    <ListItemText primary={location.name} />
                    <ListItemText secondary={location.description} />
                  </Box>
                  <Box display="flex" flexDirection="column">
                    <IconButton
                      component={RouterLink}
                      to={`/neuer_ort/edit/:${location.id}`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={async () => {
                        const response = await deletePlace(token, location.id)
                        if (response.status && response.status === 204)
                          await initUserData(token, dispatch)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </LocationListItem>
            )
        })}
      </List>
    </LocationBox>
  )
}

export default memo(LocationList)
