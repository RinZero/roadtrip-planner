import React, { memo, Suspense, lazy } from 'react'

import { Box } from '@material-ui/core'

import { NewPlaceStyles } from '../NewPlacePage/style'

const NewPlaceForm = React.lazy(() => import('../../components/NewPlaceForm'))

type PropsForForm = {
  match: Record<string, any>
}

const EditPlacePage = (props: PropsForForm) => {
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

export default memo(EditPlacePage)
