import React, { memo } from 'react'

import {
  List,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListItem,
  withTheme,
  Box,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { useSelector } from 'react-redux'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import {
  selectUserLocations,
  selectUserId,
  selectUserToken,
} from '../../store/selectors'
import { userEntry } from '../../store/ui/types'
import { editPlace, placeType } from '../../utils/CreateNewPlace'

const LoactionListItem = withTheme(styled(ListItem)`
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  border: 1px solid rgb(0 0 0 / 16%);
  margin-bottom: ${(props) => props.theme.spacing(1.2)}px;
`)

export const LocationList = () => {
  const locations = useSelector(selectUserLocations())
  const userID = useSelector(selectUserId())
  const token = useSelector(selectUserToken())

  return (
    <List>
      {locations?.map((location) => {
        return (
          <LoactionListItem button key={location.id}>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Box display="flex" flexDirection="column">
                <ListItemText primary={location.name} />
                <ListItemText secondary={location.description} />
              </Box>
              <Box display="flex" flexDirection="column">
                <IconButton>
                  <EditIcon
                    component={RouterLink}
                    to={`/neuer_ort/edit/:${location.id}`}
                  />
                </IconButton>
                <IconButton>
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
