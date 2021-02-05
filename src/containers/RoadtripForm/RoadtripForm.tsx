import React, { memo } from 'react'

import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'

import CustomCategorySelect from '../../components/CustomCategorySelect'
import EditRoadtripComponent from '../../components/EditRoadtripComponent'
import StartGoalForm from '../../components/StartGoalForm'
import StepsMenu from '../../components/StepsMenu'
import { selectProgessStep } from '../../store/selectors'

const RoadtripForm = () => {
  const progressStep = useSelector(selectProgessStep())
  return (
    <>
      <StepsMenu />
      {progressStep.toString() === '1' && <StartGoalForm />}
      {progressStep.toString() === '2' && <CustomCategorySelect />}
      {progressStep.toString() === '3' && <EditRoadtripComponent />}
      {progressStep.toString() === '4' && (
        <Typography variant="h3">Danke fürs User Testen xD</Typography>
      )}
    </>
  )
}

export default memo(RoadtripForm)
