/* eslint-disable no-console */
import React, { memo } from 'react'

import {
  Box,
  Fab,
  Typography,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { setProgressStep } from '../../store/actions'
import { selectProgessStep } from '../../store/selectors'

const StyledFab = styled(Fab)`
  background-color: #fff;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  &.active {
    box-shadow: 0 0 0 3px #71b255;
  }
`

const StepsMenu = () => {
  const dispatch = useDispatch()
  const progressStep = useSelector(selectProgessStep())
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <Box
      display="flex"
      my={2}
      mx={0}
      width="100%"
      justifyContent="space-evenly"
    >
      <StyledFab
        size={isMobile ? 'small' : 'large'}
        onClick={() => dispatch(setProgressStep({ progressStep: '1' }))}
        className={progressStep.toString() === '1' ? 'active' : ''}
      >
        <Typography variant="h5">1</Typography>
      </StyledFab>
      <StyledFab
        size={isMobile ? 'small' : 'large'}
        onClick={() => dispatch(setProgressStep({ progressStep: '2' }))}
        className={progressStep.toString() === '2' ? 'active' : ''}
      >
        <Typography variant="h5">2</Typography>
      </StyledFab>
      <StyledFab
        size={isMobile ? 'small' : 'large'}
        onClick={() => dispatch(setProgressStep({ progressStep: '3' }))}
        className={progressStep.toString() === '3' ? 'active' : ''}
      >
        <Typography variant="h5">3</Typography>
      </StyledFab>
      <StyledFab
        size={isMobile ? 'small' : 'large'}
        onClick={() => dispatch(setProgressStep({ progressStep: '4' }))}
        className={progressStep.toString() === '4' ? 'active' : ''}
      >
        <Typography variant="h5">4</Typography>
      </StyledFab>
    </Box>
  )
}
export default memo(StepsMenu)
