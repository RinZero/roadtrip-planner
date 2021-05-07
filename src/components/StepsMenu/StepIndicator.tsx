import React from 'react'

import { Box, Fab, Typography, Link, withTheme } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import { setPreviousStep } from '../../store/actions'
import { selectProgessStep } from '../../store/selectors'
const slideInLeft = keyframes`
0% {
  transform: translateX(calc(70vw / 4));
}
100% {
  transform: translateX(0);
}
`
const slideInRight = keyframes`
0% {
  transform: translateX(calc(-70vw / 4));
}
100% {
  transform: translateX(0);
}
`

const slideInRightLarge = keyframes`
0% {
  transform: translateX(calc(-70vw / 4 + 30px));
}
100% {
  transform: translateX(0);
}
`

const slideInLeftLarge = keyframes`
0% {
  transform: translateX(calc(70vw / 4 - 30px));
}
100% {
  transform: translateX(0);
}
`

const StyledFab = styled(Fab)`
  background-color: #fff;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  transition: box-shadow 0.4s ease-in-out;
  transition-delay: 0;
  &.active {
    box-shadow: 0 0 0 3px #71b255;
    transition-delay: 0.9s;
  }
`

const StyledUnderline = withTheme(styled(Typography)`
  margin-top: ${(props) => props.theme.spacing(1)}px;
  color: #707070;
  transition: color 0.4s ease-in-out;
  transition-delay: 0;
  &.active {
    color: #71b255;
    transition-delay: 0.9s;
  }
`)
const ColorBall = withTheme(styled.div<{ isGoingBack: boolean }>`
  border-radius: 1000000px;
  height: ${(props) => props.theme.spacing(4)}px;
  width: ${(props) => props.theme.spacing(4)}px;
  background-color: #71b255;
  position: absolute;
  z-index: -1;
  &.active {
    animation: ${(props) => (props.isGoingBack ? slideInLeft : slideInRight)}
      0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation-delay: 0.4s;
    ${(props) => props.theme.breakpoints.up('lg')} {
      animation: ${(props) =>
          props.isGoingBack ? slideInLeftLarge : slideInRightLarge}
        0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }
  }
`)
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
        <Link component={RouterLink} to={`/step/:${number}`}>
          <StyledFab
            size={isMobile ? 'small' : 'large'}
            className={isActive ? 'active' : ''}
          >
            <Typography variant="h5">{number}</Typography>
          </StyledFab>
        </Link>
      </Box>
      <StyledUnderline variant="subtitle2" className={isActive ? 'active' : ''}>
        {text}
      </StyledUnderline>
    </Box>
  )
}
