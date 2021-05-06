import React, { memo } from 'react'

import { Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import { setProgressStep } from '../../store/actions'
const EditRoadtripCreation = React.lazy(
  () => import('../../components/EditRoadtripCreation')
)
const StepsMenu = React.lazy(() => import('../../components/StepsMenu'))
const StartGoalForm = React.lazy(() => import('../../components/StartGoalForm'))
const SelectCategories = React.lazy(
  () => import('../../containers/SelectCategories')
)

type PropsForForm = {
  id: string
}

const RoadtripForm = (props: PropsForForm) => {
  const dispatch = useDispatch()
  const progressString = props.id ? props.id[1] : '1'
  if (progressString === '1') dispatch(setProgressStep({ progressStep: '1' }))
  else if (progressString === '2')
    dispatch(setProgressStep({ progressStep: '2' }))
  else if (progressString === '3')
    dispatch(setProgressStep({ progressStep: '3' }))
  else if (progressString === '4')
    dispatch(setProgressStep({ progressStep: '4' }))

  return (
    <>
      <StepsMenu />
      {progressString === '1' && <StartGoalForm />}
      {progressString === '2' && <SelectCategories />}
      {progressString === '3' && <EditRoadtripCreation />}
      {progressString === '4' && (
        <Typography variant="h3">Der Roadtrip wurde erstellt ^^</Typography>
      )}
    </>
  )
}

export default memo(RoadtripForm)
