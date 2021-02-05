import React, { memo } from 'react'

import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  withTheme,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import {
  setMapRoute,
  setMaxRoadtripStops,
  setProgressStep,
  setRoadtripStops,
  setUiSelectedCategories,
} from '../../store/actions'
import {
  selectRoadtripStops,
  selectMaxRoadtripStops,
  selectUiSelectedCategories,
} from '../../store/selectors'
import { fetchHereData } from '../../utils/fetchHereData'

const StyledForm = withTheme(styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)}px;
`)

const StyledButton = withTheme(styled(Button)`
  width: 100%;
  color: #ffffff;
  background-color: #71b255;
  padding: ${(props) => props.theme.spacing(2.5)}px;
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
`)

const StyledTextField = withTheme(styled(TextField)`
  margin: 0 ${(props) => props.theme.spacing(2)}px;
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);

  .MuiInput-underline {
    :after {
      content: none;
    }
    :before {
      content: none;
    }
  }
`)

const StartGoalTextField = withTheme(styled(StyledTextField)`
  height: ${(props) => props.theme.spacing(13.5)}px;

  * {
    margin-left: ${(props) => props.theme.spacing(3.7)}px;
    font-size: 40px;
  }
`)

const StopIndicatorTextField = withTheme(styled(StyledTextField)`
  width: ${(props) => props.theme.spacing(8)}px;
  height: ${(props) => props.theme.spacing(8)}px;
`)
type IFormInput = {
  stops: string[]
}

export const StartGoalForm = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const onFormSubmit = (data: IFormInput) => {
    const roadtripStops = data.stops.filter((s) => s !== '')
    // dispatch(setRoadtripStops({ roadtripStops }))
    dispatch(setProgressStep({ progressStep: '2' }))
  }
  const roadtripGenerate = async (
    stops: number[][],
    maxStops: number,
    categories: string[]
  ) => {
    // const center = createCenter(stops[0], stops[stops.length - 1])

    const query = '' + categories.map((category) => category)
    const limit = maxStops

    const route: number[][] = new Array(maxStops)
    for (let i = 0; i < route.length; i++) {
      if (i < stops.length) {
        route[i] = stops[i]
      } else {
        const random1 = Math.floor(Math.random() * Math.floor(stops.length))
        const center = stops[random1]
        // eslint-disable-next-line no-console
        console.log(stops, center, random1)
        const possibleStops = await fetchHereData({
          object: { endpoint: 'browse', query: query },
          at: { longitude: center[0], latitude: center[1] },
          language: 'de',
          limit: 100,
          route: {
            stopps: stops,
            width: 40000,
          },
        })
        if (possibleStops.items.length > 0) {
          const random2 = Math.floor(
            Math.random() * Math.floor(possibleStops.items.length)
          )
          // eslint-disable-next-line no-console
          console.log('random', random2)
          route[i] = [
            possibleStops.items[random2].access[0].lat,
            possibleStops.items[random2].access[0].lng,
            i + 1,
          ]
        }
      }

      route.sort(
        (a, b) => calcDistance(stops[0], a) - calcDistance(stops[0], b)
      )
      route.sort((a, b) => {
        if (calcDistance(stops[stops.length - 1], a) <= 0) {
          return (
            calcDistance(stops[stops.length - 1], b) -
            calcDistance(stops[stops.length - 1], a)
          )
        }
        return -1
      })
    }
    return route.map((data) => data[0].toString() + ',' + data[1].toString())
  }

  const calcDistance = (p1: number[], p2: number[]) => {
    const lat1 = p1[0]
    const lon1 = p1[1]
    const lat2 = p2[0]
    const lon2 = p2[1]
    if (lat1 === lat2 && lon1 === lon2) {
      return 0
    } else {
      const radlat1 = (Math.PI * lat1) / 180
      const radlat2 = (Math.PI * lat2) / 180
      const theta = lon1 - lon2
      const radtheta = (Math.PI * theta) / 180
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
      if (dist > 1) {
        dist = 1
      }
      dist = Math.acos(dist)
      dist = (dist * 180) / Math.PI
      dist = dist * 60 * 1.1515
      return dist
    }
  }
  //TESTS
  // Setup
  dispatch(
    setRoadtripStops({
      roadtripStops: [
        [47.79941, 13.04399, 1.0],
        [46.6357, 14.311817, 2.0],
        [47.416, 15.2617, 3.0],
      ],
    })
  )
  dispatch(setMaxRoadtripStops({ maxRoadtripStops: 10 }))
  dispatch(
    setUiSelectedCategories({
      // eslint-disable-next-line no-octal
      selectedCategories: ['550-5520-0208'],
    })
  )
  // eslint-disable-next-line no-console
  console.log('tests finshed')

  const stops = useSelector(selectRoadtripStops())
  const maxStops = useSelector(selectMaxRoadtripStops())
  const categories = useSelector(selectUiSelectedCategories())
  const history = useHistory()
  return (
    <>
      <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
        <Box display="flex" width="100%" justifyContent="center">
          <StartGoalTextField
            label="Start"
            name="stops[0]"
            inputRef={register}
            fullWidth
            placeholder="Salzburg"
          />
          <StartGoalTextField
            label="Goal"
            name="stops[4]"
            inputRef={register}
            fullWidth
            placeholder="Graz"
          />
        </Box>

        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} lg={8} justify="space-evenly" alignItems="center">
            <Box
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Typography variant="h6">Stops</Typography>
              <StopIndicatorTextField
                label="1"
                name="stops[1]"
                inputRef={register}
              />
              <StopIndicatorTextField
                label="2"
                name="stops[2]"
                inputRef={register}
              />
              <StopIndicatorTextField
                label="3"
                name="stops[3]"
                inputRef={register}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box p={5}>
              <StyledButton type="submit">Start</StyledButton>
            </Box>
          </Grid>
        </Grid>
      </StyledForm>
      <Button
        size="large"
        onClick={async () => {
          const response = await roadtripGenerate(stops, maxStops, categories)
          dispatch(setMapRoute({ mapRoute: response }))
        }}
      >
        Lets go
      </Button>
      <Button onClick={() => history.push('/test')}>history</Button>
    </>
  )
}

export default memo(StartGoalForm)
