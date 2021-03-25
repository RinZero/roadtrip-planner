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
import styled from 'styled-components'

import { selectUserLocations } from '../../store/selectors'

const LoactionListItem = withTheme(styled(ListItem)`
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  border: 1px solid rgb(0 0 0 / 16%);
  margin-bottom: ${(props) => props.theme.spacing(1.2)}px;
`)

const BoxLocationList = withTheme(styled(List)`
  width: 100%;
  min-width: ${(props) => props.theme.spacing(25)}px;
  overflow: auto;
  max-width: 70vw;
  max-height: 32vh;
  margin-top: ${(props) => props.theme.spacing(1)}px;
`)

export const LocationList = () => {
  const locations = useSelector(selectUserLocations())
  return (
    <BoxLocationList>
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
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </LoactionListItem>
        )
      })}
    </BoxLocationList>
  )
}

export default memo(LocationList)
