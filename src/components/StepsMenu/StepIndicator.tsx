import React from 'react'

import { Box, Typography, Link } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import { setPreviousStep } from '../../store/actions'
import { selectProgessStep } from '../../store/selectors'
import { StyledFab, StyledUnderline, ColorBall, FabLink } from './style'

export type StepIndicatorProps = {
  number: number
  isMobile: boolean
  isActive: boolean
  text: string
  isGoingBack: boolean
}
export const StepIndicator = (props: StepIndicatorProps) => {
  const { number, isMobile, isActive, text, isGoingBack } = props
  const dispatch = useDispatch()
  const currentStep = useSelector(selectProgessStep())
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
    >
      <Box
        display="flex"
        alignItems="center"
        onClick={() => {
          dispatch(setPreviousStep({ previousStep: currentStep }))
        }}
      >
        <ColorBall
          className={isActive ? 'active' : ''}
          isGoingBack={isGoingBack}
        />
        <FabLink component={RouterLink} to={`/step/:${number}`}>
          <StyledFab
            size={isMobile ? 'small' : 'large'}
            className={isActive ? 'active' : ''}
          >
            <Typography variant="h5">{number}</Typography>
          </StyledFab>
        </FabLink>
      </Box>
      <StyledUnderline variant="subtitle2" className={isActive ? 'active' : ''}>
        {text}
      </StyledUnderline>
    </Box>
  )
}
