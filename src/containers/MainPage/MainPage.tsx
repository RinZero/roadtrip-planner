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

const MainPage = () => {
  const classes = useStyles()

  //https://discover.search.hereapi.com/v1/discover?at=52.8173086,12.2368342&limit=5&lang=en&q=Obi+Hamburg&apiKey=E2lDYLhdeOT8rv2atmJ78m7_jafCkXg3NmgSAwjpcdE'
  useEffect(() => {
    fetchHereData({
      object: { endpoint: 'discover', query: 'Obi+Hamburg' },
      at: { longitude: 52.8173086, latitude: 12.2368342 },
      limit: 5,
      language: 'en',
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

export default memo(MainPage)
