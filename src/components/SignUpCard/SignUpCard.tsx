import React, { memo, ReactNode } from 'react'

import { withTheme, Paper, Avatar, Typography } from '@material-ui/core'
import styled, { keyframes } from 'styled-components'

const coolAnimations = keyframes`
0% {
  -webkit-transform: translateY(-45px);
          transform: translateY(-45px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
  opacity: 1;
}
24% {
  opacity: 1;
}
40% {
  -webkit-transform: translateY(-24px);
          transform: translateY(-24px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
65% {
  -webkit-transform: translateY(-12px);
          transform: translateY(-12px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
82% {
  -webkit-transform: translateY(-6px);
          transform: translateY(-6px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
93% {
  -webkit-transform: translateY(-4px);
          transform: translateY(-4px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
25%,
55%,
75%,
87% {
  -webkit-transform: translateY(0px);
          transform: translateY(0px);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
}
100% {
  -webkit-transform: translateY(0px);
          transform: translateY(0px);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
  opacity: 1;
}
`

const ImageCircle = withTheme(styled(Avatar)<{ size: number; isLeft: boolean }>`
  height: ${(props) => props.theme.spacing(props.size)}px;
  width: ${(props) => props.theme.spacing(props.size)}px;
  margin-left: ${(props) =>
    props.isLeft ? 0 : props.theme.spacing(-props.size / 2)}px;
  margin-right: ${(props) =>
    props.isLeft ? props.theme.spacing(-props.size / 2) : 0}px;
  display: block;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  ${(props) => props.theme.breakpoints.down('sm')} {
    margin: 0;
    margin-bottom: ${(props) => props.theme.spacing(-props.size / 4)}px;
  }
  :hover {
    animation: ${coolAnimations} 1.2s ease both;
  }
`)

const InfoPaper = withTheme(styled(Paper)<{ size: number; isLeft: boolean }>`
  min-height: ${(props) => props.theme.spacing(15)}px;
  min-width: ${(props) => props.theme.spacing(40)}px;

  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
`)

const CardContainer = withTheme(styled.div<{ isLeft: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isLeft ? 'row-reverse' : 'row')};
  align-items: center;
  justify-content: flex-end;
  ${(props) => props.theme.breakpoints.down('sm')} {
    flex-direction: column-reverse;
    margin-top: ${(props) => props.theme.spacing(3)}px;
  }
`)

const MarginContainer = withTheme(styled.div<{
  size: number
  isLeft: boolean
}>`
  margin: ${(props) => props.theme.spacing(1.5)}px;
  margin-right: ${(props) =>
    props.isLeft
      ? props.theme.spacing(3)
      : props.theme.spacing(props.size / 2 + 1.5)}px;
  margin-left: ${(props) =>
    props.isLeft
      ? props.theme.spacing(props.size / 2 + 1.5)
      : props.theme.spacing(3)}px;
  :not(:first-child) {
    margin-top: ${(props) => props.theme.spacing(1)}px;
  }
  ${(props) => props.theme.breakpoints.down('sm')} {
    margin-top: ${(props) => props.theme.spacing(props.size / 4)}px;
    margin-left: ${(props) => props.theme.spacing(3)}px;
    margin-right: ${(props) => props.theme.spacing(3)}px;
  }
`)

const ColorContainer = withTheme(styled.div<{
  color?: string
}>`
  background-color: ${(props) => props.color || 'inherit'};
  width: 100%;
  border-radius: 15px 15px 0 0;
`)

const Title = withTheme(styled(Typography)`
  margin-top: 0;
  width: 100%;
`)

type SignUpCardProps = {
  size?: number
  image: string
  isLeft?: boolean
  text?: ReactNode
  title?: string
  color?: string
}

const SignUpCard = (props: SignUpCardProps) => {
  const {
    size = 15,
    image,
    isLeft = true,
    text,
    title = '',
    color = 'lightblue',
  } = props
  return (
    <CardContainer isLeft={isLeft}>
      <InfoPaper isLeft={isLeft} size={size}>
        <ColorContainer color={color}>
          <MarginContainer isLeft={isLeft} size={size}>
            <Title variant="h3">{title}</Title>
          </MarginContainer>
        </ColorContainer>
        <MarginContainer isLeft={isLeft} size={size}>
          <Typography variant="body1">{text}</Typography>
        </MarginContainer>
      </InfoPaper>
      <ImageCircle size={size} alt="Profilbild" src={image} isLeft={isLeft} />
    </CardContainer>
  )
}

export default memo(SignUpCard)
