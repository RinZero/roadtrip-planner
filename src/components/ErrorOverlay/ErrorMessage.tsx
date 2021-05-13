import React, { memo, useEffect, useState } from 'react'

import { Typography, Box } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import bus from '../../assets/jpgBus.jpg'
import { setMessage } from '../../store/actions'
import { ImageBox, StyledPaper, StyledSlide } from './style'

type ErrorMessageProps = {
  message: string
}

const ErrorMessage = (props: ErrorMessageProps) => {
  const { message = '' } = props
  const [inBool, setInBool] = useState(false)
  const dispatch = useDispatch()

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
        dispatch(setMessage({ message: '' }))
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
