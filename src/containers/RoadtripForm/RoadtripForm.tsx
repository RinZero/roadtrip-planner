import React, { memo, Suspense, lazy } from 'react'

import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'

//import EditRoadtripComponent from '../../components/EditRoadtripComponent'
//import StartGoalForm from '../../components/StartGoalForm'
//import StepsMenu from '../../components/StepsMenu'
//import SelectCategories from '../../containers/SelectCategories'
import { selectProgessStep } from '../../store/selectors'
const EditRoadtripComponent = React.lazy(
  () => import('../../components/EditRoadtripComponent')
)
const StepsMenu = React.lazy(() => import('../../components/StepsMenu'))
const StartGoalForm = React.lazy(() => import('../../components/StartGoalForm'))
const SelectCategories = React.lazy(
  () => import('../../containers/SelectCategories')
)

const RoadtripForm = () => {
  const progressStep = useSelector(selectProgessStep())
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <StepsMenu />
        {progressStep.toString() === '1' && <StartGoalForm />}
        {progressStep.toString() === '2' && <SelectCategories />}
        {progressStep.toString() === '3' && <EditRoadtripComponent />}
        {progressStep.toString() === '4' && (
          <Typography variant="h3">Danke fürs User Testen xD</Typography>
        )}
      </Suspense>
    </>
  )
}

export default memo(RoadtripForm)
