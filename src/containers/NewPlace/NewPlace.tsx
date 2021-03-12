/* eslint-disable prettier/prettier */
import React, { memo } from 'react'

import { Box, withTheme } from '@material-ui/core'
import styled from 'styled-components'

import NewPlaceForm from '../../components/NewPlaceForm'

const NewPlaceStyles = withTheme(styled.div`
  max-width: 70%;
  padding: ${(props) => props.theme.spacing(10)}px 0;
  display: flex;
  flex-direction: column;
  height: 93vh;
  justify-content: space-around;
`)

const NewPlace = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <NewPlaceStyles>
        <NewPlaceForm />
      </NewPlaceStyles>
    </Box>
  )
}

export default memo(NewPlace)
