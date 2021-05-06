import React, { memo } from 'react'

import { useSelector } from 'react-redux'

import { selectProgessStep } from '../../store/selectors'
const EditRoadtripCreation = React.lazy(
  () => import('../../components/EditRoadtripCreation')
)
const ShareRoadtrip = React.lazy(() => import('../../containers/ShareRoadtrip'))
const StepsMenu = React.lazy(() => import('../../components/StepsMenu'))
const StartGoalForm = React.lazy(() => import('../../components/StartGoalForm'))
const SelectCategories = React.lazy(
  () => import('../../containers/SelectCategories')
)

const RoadtripForm = () => {
  const progressStep = useSelector(selectProgessStep())
  return (
    <>
      <StepsMenu />
      {progressStep.toString() === '1' && <StartGoalForm />}
      {progressStep.toString() === '2' && <SelectCategories />}
      {progressStep.toString() === '3' && <EditRoadtripCreation />}
      {progressStep.toString() === '4' && <ShareRoadtrip />}
    </>
  )
}

export default memo(RoadtripForm)
