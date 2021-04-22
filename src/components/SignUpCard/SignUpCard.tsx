import React, { memo } from 'react'

import { withTheme, Paper, Typography } from '@material-ui/core'
import styled from 'styled-components'

const ImageCircle = withTheme(styled.div`
  border-radius: 10000000000000000px;
  width: ${(props) => props.theme.spacing(12.5)}px;
  height: ${(props) => props.theme.spacing(12.5)}px;
  background-color: blue;
  margin-left: -${(props) => props.theme.spacing(7.5)}px;
`)

const InfoPaper = withTheme(styled(Paper)`
  height: ${(props) => props.theme.spacing(15)}px;
  width: ${(props) => props.theme.spacing(40)}px;
`)

const CardContainer = withTheme(styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`)

const SignUpPage = () => {
  return (
    <CardContainer>
      <InfoPaper>
        <Typography variant="h3">title</Typography>
        <Typography variant="body1">kein title</Typography>
      </InfoPaper>
      <ImageCircle />
    </CardContainer>
  )
}

export default memo(SignUpPage)
