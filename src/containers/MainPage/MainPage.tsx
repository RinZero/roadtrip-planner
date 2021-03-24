import React, { memo, Suspense } from 'react'

import { Box, withTheme } from '@material-ui/core'
import styled from 'styled-components'

import TitleSection from '../../components/TitleSection'
import RoadtripForm from '../RoadtripForm'

const MainPageStyles = withTheme(styled.div`
  max-width: 70%;
  padding: ${(props) => props.theme.spacing(10)}px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
