import React, { memo, useEffect, useState } from 'react'

import { withTheme, Slide, Paper, Typography, Box } from '@material-ui/core'
import styled from 'styled-components'

import bus from '../../assets/jpgBus.jpg'

const StyledSlide = withTheme(styled(Slide)`
  width: 100%;
  background-color: white;
`)

const ImageBox = withTheme(styled(Box)`
  img {
    height: ${(props) => props.theme.spacing(10)}px;
    padding-right: ${(props) => props.theme.spacing(1)}px;
  }
`)

const StyledPaper = withTheme(styled(Paper)`
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(1)}px;
`)

type ErrorMessageProps = {
  message: string
}

const ErrorMessage = (props: ErrorMessageProps) => {
  const { message = '' } = props
  const [inBool, setInBool] = useState(false)

  useEffect(() => {
    setInBool(message !== '')
    setTimeout(() => {
      setInBool(false)
    }, 6000)
  }, [setInBool, message])

  return (
    <StyledSlide
      direction={inBool ? 'left' : 'right'}
      in={inBool}
      mountOnEnter
      unmountOnExit
      timeout={{ enter: 2500, exit: 2500 }}
      onExited={() => {
        setInBool(false)
      }}
    >
      <StyledPaper elevation={4}>
        <ImageBox>
          <img src={bus} alt="Nachricht-Meldungs-Bus" />
        </ImageBox>
        <Box mr={1}>
          <Typography variant="body1"> {message}</Typography>
        </Box>
      </StyledPaper>
    </StyledSlide>
  )
}

export default memo(ErrorMessage)
