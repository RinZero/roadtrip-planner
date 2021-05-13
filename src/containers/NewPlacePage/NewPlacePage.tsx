import React, { memo, Suspense, lazy } from 'react'

import { Box } from '@material-ui/core'

import { NewPlaceStyles } from './style'

const NewPlaceForm = React.lazy(() => import('../../components/NewPlaceForm'))

type PropsForForm = {
  match: Record<string, any>
}

const NewPlacePage = (props: PropsForForm) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <NewPlaceStyles>
        <Suspense fallback={<div>Loading...</div>}>
          <NewPlaceForm match={props.match} />
        </Suspense>
      </NewPlaceStyles>
    </Box>
  )
}

export default memo(NewPlacePage)
