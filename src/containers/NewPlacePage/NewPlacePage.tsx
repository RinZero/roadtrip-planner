import React, { memo, Suspense, lazy } from 'react'

import { Box, withTheme } from '@material-ui/core'
import styled from 'styled-components'

const NewPlaceForm = React.lazy(() => import('../../components/NewPlaceForm'))

const NewPlaceStyles = withTheme(styled.div`
  max-width: 70%;
  padding: ${(props) => props.theme.spacing(10)}px 0;
  display: flex;
  flex-direction: column;
  height: 90vh;
  justify-content: space-around;
`)

const NewPlacePage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <NewPlaceStyles>
        <Suspense fallback={<div>Loading...</div>}>
          <NewPlaceForm />
        </Suspense>
      </NewPlaceStyles>
    </Box>
  )
}

export default memo(NewPlacePage)
