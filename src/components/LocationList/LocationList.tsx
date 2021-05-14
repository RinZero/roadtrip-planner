import React, { memo } from 'react'

import { List, ListItemText, IconButton, Box } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import { DialogDelete } from '../../components/DialogDelete'
import { selectUserLocations, selectUserId } from '../../store/selectors'
import { LocationBox, LocationListItem } from './style'
export const LocationList = () => {
  const locations = useSelector(selectUserLocations())
  const userID = (useSelector(selectUserId()) as unknown) as number

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
                    <DialogDelete objectType="Ort" id={location.id} />
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
