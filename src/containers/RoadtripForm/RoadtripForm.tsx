import React, { memo } from 'react'

import StartGoalForm from '../../components/StartGoalForm'
import StepsMenu from '../../components/StepsMenu'

const RoadtripForm = () => {
  return (
    <>
      <StepsMenu />
      <StartGoalForm />
    </>
  )
}

export default memo(RoadtripForm)
