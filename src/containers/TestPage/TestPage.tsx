import React, { memo, useEffect } from 'react'

import { Box, Button, makeStyles, Theme } from '@material-ui/core'
import styled from 'styled-components'

import StartGoalForm from '../../components/StartGoalForm'
import StepsMenu from '../../components/StepsMenu'
import TitleSection from '../../components/TitleSection'
import { fetchHereData } from '../../utils/fetchHereData'

//import TestComponent from "././components/TestComponent";

// Styles hinzufügen Art 1
const useStyles = makeStyles((theme: Theme) => ({
  test: {
    color: 'green',
    backgroundColor: 'lightgreen',
  },
}))

// Art 2
const FancyButton = styled(Button)`
  color: pink;
  background-color: lightpink;
`

const TestPage = () => {
  const classes = useStyles()

  //https://discover.search.hereapi.com/v1/discover?at=52.8173086,12.2368342&limit=5&lang=en&q=Obi+Hamburg&apiKey=E2lDYLhdeOT8rv2atmJ78m7_jafCkXg3NmgSAwjpcdE'
  useEffect(() => {
    fetchHereData({
      object: { endpoint: 'discover', query: 'zoo' },
      at: { longitude: 41.70035, latitude: -93.20866 },
      limit: 10,
      language: 'en',
      route: {
        stopps: [
          [52.51994, 13.38663, 1.0],
          [52.51009, 13.28169, 2.0],
          [52.43518, 13.19352, 3.0],
          [52.41073, 13.19645, 4.0],
          [52.38871, 13.15578, 5.0],
          [52.37278, 13.1491, 6.0],
          [52.37375, 13.11546, 7.0],
          [52.38752, 13.08722, 8.0],
          [52.40294, 13.07062, 9.0],
          [52.41058, 13.07555, 10.0],
        ],
        width: 20000000,
      },
    })
  }, [])
  return (
    <>
      <h1>Hello World</h1>
      <Box display="flex" justifyContent="center">
        <Box width="70%">
          <StepsMenu />
          <StartGoalForm />
        </Box>
      </Box>

      <Button className={classes.test}>hello</Button>
      <FancyButton>Heyyyy</FancyButton>
      <TitleSection />
    </>
  )
}

export default memo(TestPage)
