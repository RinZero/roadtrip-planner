import React, { memo } from 'react'

import { Box, withTheme, Paper, Typography } from '@material-ui/core'
import styled from 'styled-components'

import SignUpForm from './SignUpForm'

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

const SignUpPageContainer = withTheme(styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: ${(props) => props.theme.spacing(5)}px;
  height: calc(
    100vh - ${(props) => props.theme.spacing(13)}px
  ); //100vh - (header(5) +footer(4))
`)

const SignUpPage = () => {
  return (
    <SignUpPageContainer>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-evenly"
        height="100%"
      >
        <CardContainer>
          <InfoPaper>
            <Typography variant="h3">title</Typography>
            <Typography variant="body1">kein title</Typography>
          </InfoPaper>
          <ImageCircle />
        </CardContainer>
        <CardContainer>
          <InfoPaper>
            <Typography variant="h3">title</Typography>
            <Typography variant="body1">kein title</Typography>
          </InfoPaper>
          <ImageCircle />
        </CardContainer>
        <CardContainer>
          <InfoPaper>
            <Typography variant="h3">title</Typography>
            <Typography variant="body1">kein title</Typography>
          </InfoPaper>
          <ImageCircle />
        </CardContainer>
        <CardContainer>
          <InfoPaper>
            <Typography variant="h3">title</Typography>
            <Typography variant="body1">kein title</Typography>
          </InfoPaper>
          <ImageCircle />
        </CardContainer>
      </Box>
      <SignUpForm />
    </SignUpPageContainer>
  )
}

export default memo(SignUpPage)
