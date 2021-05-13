import { Fab, Typography, withTheme } from '@material-ui/core'
import styled, { keyframes } from 'styled-components'

//StepIndicator

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

export const StyledFab = styled(Fab)`
  background-color: #fff;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  transition: box-shadow 0.4s ease-in-out;
  transition-delay: 0;
  &.active {
    box-shadow: 0 0 0 3px #71b255;
    transition-delay: 0.9s;
  }
`

export const StyledUnderline = withTheme(styled(Typography)`
  margin-top: ${(props) => props.theme.spacing(1)}px;
  color: #707070;
  transition: color 0.4s ease-in-out;
  transition-delay: 0;
  &.active {
    color: #71b255;
    transition-delay: 0.9s;
  }
`)
export const ColorBall = withTheme(styled.div<{ isGoingBack: boolean }>`
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
