/* eslint-disable no-console */
import React, { memo } from 'react'

import {
  Box,
  Fab,
  Typography,
  useTheme,
  useMediaQuery,
  Link,
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

import { selectProgessStep } from '../../store/selectors'

const StyledFab = styled(Fab)`
  background-color: #fff;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  &.active {
    box-shadow: 0 0 0 3px #71b255;
  }
`

const StepsMenu = () => {
  const progressStep = useSelector(selectProgessStep())
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <Box
      id="step_menu"
      display="flex"
      my={2}
      mx={0}
      width="100%"
      justifyContent="space-evenly"
    >
      <Link component={RouterLink} to={`/step/:1`}>
        <StyledFab
          size={isMobile ? 'small' : 'large'}
          className={progressStep.toString() === '1' ? 'active' : ''}
        >
          <Typography variant="h5">1</Typography>
        </StyledFab>
      </Link>

      <Link component={RouterLink} to={`/step/:2`}>
        <StyledFab
          size={isMobile ? 'small' : 'large'}
          className={progressStep.toString() === '2' ? 'active' : ''}
        >
          <Typography variant="h5">2</Typography>
        </StyledFab>
      </Link>

      <Link component={RouterLink} to={`/step/:3`}>
        <StyledFab
          size={isMobile ? 'small' : 'large'}
          className={progressStep.toString() === '3' ? 'active' : ''}
        >
          <Typography variant="h5">3</Typography>
        </StyledFab>
      </Link>

      <Link component={RouterLink} to={`/step/:4`}>
        <StyledFab
          size={isMobile ? 'small' : 'large'}
          className={progressStep.toString() === '4' ? 'active' : ''}
        >
          <Typography variant="h5">4</Typography>
        </StyledFab>
      </Link>
    </Box>
  )
}
export default memo(StepsMenu)
