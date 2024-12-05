import { memo, Suspense } from 'react'

import { Box } from '@material-ui/core'

import LoadingAnimation from '../../components/LoadingAnimation'
import TitleSection from '../../components/TitleSection'
import RoadtripForm from '../RoadtripForm'
import { MainPageStyles } from './style'
type PropsForForm = {
  match: Record<string, any>
}

const MainPage = (props: PropsForForm) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <MainPageStyles>
        <TitleSection />
        <Suspense fallback={<LoadingAnimation />}>
          <RoadtripForm id={props.match.params.id} />
        </Suspense>
      </MainPageStyles>
    </Box>
  )
}

export default memo(MainPage)
