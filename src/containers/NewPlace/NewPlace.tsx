/* eslint-disable prettier/prettier */
import React, { memo } from 'react'

import { Box, withTheme } from '@material-ui/core'
import styled from 'styled-components'

import NewPlaceForm from '../../components/NewPlaceForm'

const NewPlace = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <NewPlaceForm />
    </Box>
  )
}

export default memo(NewPlace)
