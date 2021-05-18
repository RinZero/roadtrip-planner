import React, { memo, useEffect, useState } from 'react'

import { Typography, Box } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import bus from '../../assets/jpgBus.jpg'
import greenBus from '../../assets/jpgGreenBus.jpg'
import { setMessage } from '../../store/actions'
import { ImageBox, StyledPaper, StyledSlide, OverlayBox } from './style'

type ErrorOverlayProps = {
  message: { content: string; status?: string }
}

const ErrorOverlay = (props: ErrorOverlayProps) => {
  const { message = { content: '', status: 'error' } } = props
  const [inBool, setInBool] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setInBool(message.content !== '')
    setTimeout(() => {
      setInBool(false)
    }, 6000)
  }, [setInBool, message])

  return (
    <OverlayBox>
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
            <img
              src={message.status === 'error' ? bus : greenBus}
              alt="Nachricht-Meldungs-Bus"
            />
          </ImageBox>
          <Box mr={1}>
            <Typography variant="body1"> {message.content}</Typography>
          </Box>
        </StyledPaper>
      </StyledSlide>
    </OverlayBox>
  )
}

export default memo(ErrorOverlay)
