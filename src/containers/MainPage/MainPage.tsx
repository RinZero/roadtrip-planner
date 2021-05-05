import React, { memo, Suspense } from 'react'

import { Box, withTheme } from '@material-ui/core'
import styled from 'styled-components'

import TitleSection from '../../components/TitleSection'
import RoadtripForm from '../RoadtripForm'

const MainPageStyles = withTheme(styled.div`
  max-width: 70%;
  padding: ${(props) => props.theme.spacing(12)}px 0
    ${(props) => props.theme.spacing(10)}px 0;
  display: flex;
  flex-direction: column;
  ${(props) => props.theme.breakpoints.up('md')} {
    height: calc(100vh - 40px);
    //40px come from LogoImg in App.css (maybe remove it??)
  }
`)

const MainPage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <MainPageStyles>
        <TitleSection />
        <Suspense fallback={<div>Loading...</div>}>
          <RoadtripForm />
        </Suspense>
      </MainPageStyles>
    </Box>
  )
}

export default memo(MainPage)
