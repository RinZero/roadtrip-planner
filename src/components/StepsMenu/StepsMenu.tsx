import { memo } from 'react'

import { Box, useTheme, useMediaQuery } from '@material-ui/core'
import { useSelector } from 'react-redux'

import { selectPreviousStep, selectProgessStep } from '../../store/selectors'
import { StepIndicator } from './StepIndicator'

const StepsMenu = () => {
  const progressStep = useSelector(selectProgessStep())
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  const prevStep = useSelector(selectPreviousStep())

  return (
    <Box
      id="step_menu"
      display="flex"
      mt={2}
      mx={0}
      width="100%"
      justifyContent="space-evenly"
      minWidth="70vw"
    >
      <StepIndicator
        number={1}
        isMobile={isMobile}
        isActive={progressStep.toString() === '1'}
        text="Stopps"
        isGoingBack={+prevStep > 1}
      />
      <StepIndicator
        number={2}
        isMobile={isMobile}
        isActive={progressStep.toString() === '2'}
        text="Kategorien"
        isGoingBack={+prevStep > 2}
      />
      <StepIndicator
        number={3}
        isMobile={isMobile}
        isActive={progressStep.toString() === '3'}
        text="Route"
        isGoingBack={+prevStep > 3}
      />
      <StepIndicator
        number={4}
        isMobile={isMobile}
        isActive={progressStep.toString() === '4'}
        text="Roadtrip"
        isGoingBack={+prevStep > 4}
      />
    </Box>
  )
}
export default memo(StepsMenu)
