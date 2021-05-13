import React, { memo } from 'react'

import ErrorMessage from './ErrorMessage'
import { OverlayBox } from './style'

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
