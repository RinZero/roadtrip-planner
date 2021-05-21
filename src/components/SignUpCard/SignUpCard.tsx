import React, { memo, ReactNode } from 'react'

import { Typography } from '@material-ui/core'

import {
  ImageCircle,
  InfoPaper,
  CardContainer,
  MarginContainer,
  ColorContainer,
  Title,
} from './style'

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
