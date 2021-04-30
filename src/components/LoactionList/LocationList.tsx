import React, { memo } from 'react'

import {
  List,
  ListItemText,
  IconButton,
  ListItem,
  withTheme,
  Box,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

import {
  selectUserLocations,
  selectUserToken,
  selectUserId,
} from '../../store/selectors'
import { deletePlace } from '../../utils/CreateNewPlace'
import { initUserData } from '../../utils/initUserData'

const LoactionListItem = withTheme(styled(ListItem)`
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  border: 1px solid rgb(0 0 0 / 16%);
  margin-bottom: ${(props) => props.theme.spacing(1.2)}px;
`)

export const LocationList = () => {
  const locations = useSelector(selectUserLocations())
  const token = useSelector(selectUserToken())
  const userIDstring = useSelector(selectUserId())
  const userID: number = +userIDstring
  const dispatch = useDispatch()

  return (
    <List>
      {locations?.map((location) => {
        if (location.user_id === userID)
          return (
            <LoactionListItem button key={location.id}>
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
            </LoactionListItem>
          )
      })}
    </List>
  )
}

export default memo(LocationList)
