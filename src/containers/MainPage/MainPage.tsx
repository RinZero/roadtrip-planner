import React, { memo } from 'react'

import { Button, makeStyles, Theme } from '@material-ui/core'
import styled from 'styled-components'

import StartGoalForm from '../../components/StartGoalForm'
import StepsMenu from '../../components/StepsMenu'
import TitleSection from '../../components/TitleSection'

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
  return (
    <>
      <h1>Hello World</h1>
      <StartGoalForm />
      <Button className={classes.test}>hello</Button>
      <FancyButton>Heyyyy</FancyButton>
      <TitleSection />
      <StepsMenu />
    </>
  )
}

export default memo(MainPage)
