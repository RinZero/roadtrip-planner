import { memo, Suspense, lazy } from 'react'

import { Box, Typography } from '@material-ui/core'

import LoadingAnimation from '../../components/LoadingAnimation'
import { NewPlaceStyles } from './style'

const NewPlaceForm = lazy(() => import('../../components/NewPlaceForm'))

type PropsForForm = {
  match: Record<string, any>
}

const NewPlacePage = (props: PropsForForm) => {
  return (
    <NewPlaceStyles>
      <Box mb={2}>
        <Typography align="center" variant="h6">
          Erstelle einen eigenen Ort, um ihn dann in deinen Roadtrips zu
          verwenden oder für alle Nutzer zugänglich zu machen
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Suspense fallback={<LoadingAnimation />}>
          <NewPlaceForm match={props.match} />
        </Suspense>
      </Box>
    </NewPlaceStyles>
  )
}

export default memo(NewPlacePage)
