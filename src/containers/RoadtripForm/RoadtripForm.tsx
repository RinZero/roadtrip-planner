import React, { memo } from 'react'

import { Button, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import EditRoadtripComponent from '../../components/EditRoadtripComponent'
import StartGoalForm from '../../components/StartGoalForm'
import StepsMenu from '../../components/StepsMenu'
import {
  setMapRoute,
  setMaxRoadtripStops,
  setRoadtripStops,
  setUiSelectedCategories,
} from '../../store/actions'
import {
  selectMaxRoadtripStops,
  selectProgessStep,
  selectRoadtripStops,
  selectUiSelectedCategories,
} from '../../store/selectors'
import { fetchHereData } from '../../utils/fetchHereData'

const RoadtripForm = () => {
  const progressStep = useSelector(selectProgessStep())
  return (
    <>
      <StepsMenu />
      {progressStep.toString() === '1' && <StartGoalForm />}
      {progressStep.toString() === '2' && (
        <Typography variant="h3">Placeholder for Categories</Typography>
      )}
      {progressStep.toString() === '3' && (
        <div>
          <EditRoadtripComponent />
        </div>
      )}
      {progressStep.toString() === '4' && (
        <Typography variant="h3">Placeholder for Save Roadtrip</Typography>
      )}
    </>
  )
}

export default memo(RoadtripForm)
