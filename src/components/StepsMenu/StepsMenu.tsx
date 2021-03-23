/* eslint-disable no-console */
import React, { memo } from 'react'

import { Box, Fab, Typography, useMediaQuery } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { setProgressStep } from '../../store/actions'

const StyledFab = styled(Fab)`
  background-color: #fff;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
`

const StepsMenu = () => {
  const dispatch = useDispatch()
  return (
    <Box display="flex" m={2} width="100%" justifyContent="space-evenly">
      <StyledFab
        onClick={() => dispatch(setProgressStep({ progressStep: '1' }))}
      >
        <Typography variant="h5">1</Typography>
      </StyledFab>
      <StyledFab
        onClick={() => dispatch(setProgressStep({ progressStep: '2' }))}
      >
        <Typography variant="h5">2</Typography>
      </StyledFab>
      <StyledFab
        onClick={() => dispatch(setProgressStep({ progressStep: '3' }))}
      >
        <Typography variant="h5">3</Typography>
      </StyledFab>
      <StyledFab
        onClick={() => dispatch(setProgressStep({ progressStep: '4' }))}
      >
        <Typography variant="h5">4</Typography>
      </StyledFab>
    </Box>
  )
}
export default memo(StepsMenu)
