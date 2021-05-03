import React, { memo } from 'react'

import { withTheme, Box } from '@material-ui/core'
import styled from 'styled-components'

import ErrorMessage from './ErrorMessage'

const OverlayBox = withTheme(styled(Box)`
  z-index: 3;
  position: fixed;
  bottom: 0;
`)

type ErrorMessageProps = {
  message: string
}

const ErrorOverlay = (props: ErrorMessageProps) => {
  const { message = '' } = props
  return (
    <>
      <OverlayBox>
        <ErrorMessage message={message} />
      </OverlayBox>
    </>
  )
}

export default memo(ErrorOverlay)
