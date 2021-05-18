import React, { memo, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { setMessage, setProgressStep } from '../../store/actions'
import {
  selectIsGenerated,
  selectRoadtripStops,
  selectUiSelectedCategories,
  selectUserToken,
} from '../../store/selectors'
const EditRoadtripCreation = React.lazy(
  () => import('../../components/EditRoadtripCreation')
)
const ShareRoadtrip = React.lazy(() => import('../../containers/ShareRoadtrip'))
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
  const history = useHistory()
  // get necessary stuff from store to check if progressStep is valid
  const dataStep1 = useSelector(selectRoadtripStops())
  const dataStep2 = useSelector(selectUiSelectedCategories())
  const dataStep3 = useSelector(selectIsGenerated())
  const token = useSelector(selectUserToken())
  const progressString = props.id ? props.id[1] : '1'
  if (progressString === '1') dispatch(setProgressStep({ progressStep: '1' }))
  else if (progressString === '2' && dataStep1.length > 1)
    dispatch(setProgressStep({ progressStep: '2' }))
  else if (
    progressString === '3' &&
    dataStep1.length > 1 &&
    dataStep2.length > 0
  )
    dispatch(setProgressStep({ progressStep: '3' }))
  else if (
    progressString === '4' &&
    dataStep1.length > 0 &&
    dataStep2.length > 0 &&
    dataStep3 &&
    token
  )
    dispatch(setProgressStep({ progressStep: '4' }))
  else {
    history.goBack()
    dispatch(
      setMessage({
        message: `Mach bitte zuerst die Schritte davor fertig.`,
      })
    )
  }

  return (
    <>
      <StepsMenu />
      {progressString === '1' && <StartGoalForm />}
      {progressString === '2' && <SelectCategories />}
      {progressString === '3' && <EditRoadtripCreation />}
      {progressString === '4' && <ShareRoadtrip />}
    </>
  )
}

export default memo(RoadtripForm)
