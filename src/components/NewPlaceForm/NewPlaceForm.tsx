/* eslint-disable prettier/prettier */
import React, { memo, useState } from 'react'

import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Input,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  withTheme,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectUserToken } from '../../store/selectors'
import { createPlace } from '../../utils/CreateNewPlace'

const StyledForm = withTheme(styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)}px;
`)

const StyledRadioGroup = withTheme(styled(RadioGroup)`
  display: flex;
  flex-direction: row !important;
`)

const StyledButton = withTheme(styled(Button)`
  color: #ffffff;
  background-color: #71b255;
  padding: ${(props) => props.theme.spacing(2.5)}px;
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
`)

const NewPlaceForm = () => {
  const [currentRadio, setCurrentRadio] = useState('privat')
  const [currentName, setCurrentName] = useState('')
  const [currentDescription, setCurrentDescription] = useState('')
  const [currentLat, setCurrentLat] = useState(-1)
  const [currentLng, setCurrentLng] = useState(-1)

  //for frontend validation numbers
  const [lngError, setLngError] = useState(false)
  const [latError, setLatError] = useState(false)
  const [lngHelperText, setLngHelperText] = useState('')
  const [latHelperText, setLatHelperText] = useState('')

  const token = useSelector(selectUserToken())

  const checkDigetInput = (event: any) => {
    const num = event.target.value
    const type = event.target.id
    let errorMessage = ''
    let error = false

    if (num > 180) {
      errorMessage = 'zu groß'
      error = true
    } else if (num < 0) {
      errorMessage = 'zu klein'
      error = true
    } else if (num.match('\\D') && num.match('\\D')[0] !== '.') {
      errorMessage = 'falsches Format'
      error = true
    }

    setError(type, errorMessage, error)
  }

  const setError = (latLng: string, errorString: string, error: boolean) => {
    if (latLng === 'lat') {
      setLatError(error)
      setLatHelperText(errorString)
    } else if (latLng === 'lng') {
      setLngError(error)
      setLngHelperText(errorString)
    }
  }

  return (
    <>
      <StyledForm>
        <TextField
          id="name-place"
          label="Name"
          variant="outlined"
          onChange={(e: any) => {
            setCurrentName(e.target.value)
          }}
        />
        <TextField
          id="description-place"
          label="Beschreibung"
          multiline
          rows={2}
          rowsMax={4}
          variant="outlined"
          onChange={(e: any) => {
            setCurrentDescription(e.target.value)
          }}
        />

        <TextField
          id="lat"
          label="Breitengrad"
          type="number"
          placeholder="47.1234"
          variant="outlined"
          error={latError}
          onChange={(e: any) => {
            checkDigetInput(e)
            setCurrentLat(e.target.value)
          }}
          // Österreichs Oberster und Unterster Breitengrad
          inputProps={{ min: '46.3800', max: '49.0200', step: '0.0100' }}
          helperText={latHelperText}
        />
        <TextField
          id="lng"
          label="Längengrad"
          type="number"
          placeholder="13.1234"
          variant="outlined"
          error={lngError}
          onChange={(e: any) => {
            checkDigetInput(e)
            setCurrentLng(e.target.value)
          }}
          // Österreichs Linkester und Rechtester Längengrad
          inputProps={{ min: '9.5300', max: '17.1500', step: '0.0100' }}
          helperText={lngHelperText}
        />

        <FormControl component="fieldset">
          <FormLabel component="legend">Sichtbarkeit</FormLabel>
          <StyledRadioGroup
            aria-label="Sichtbarkeit"
            name="sichtbarkeit"
            value={currentRadio}
            onChange={(e: any) => {
              setCurrentRadio(e.target.value)
            }}
          >
            <FormControlLabel
              value="privat"
              control={<Radio />}
              label="Privat"
            />
            <FormControlLabel
              value="öffentlich"
              control={<Radio />}
              label="Öffentlich"
            />
          </StyledRadioGroup>
        </FormControl>

        <StyledButton
          onClick={async () => {
            const place = {
              type: 'user_entry',
              attributes: {
                public: currentRadio === 'privat' ? false : true,
                name: currentName,
                description: currentDescription,
                latitude: currentLat,
                longitude: currentLng,
              },
            }
            // eslint-disable-next-line no-console
            console.log(place)
            createPlace(place, token)
          }}
        >
          Neuen Ort erstellen
        </StyledButton>
      </StyledForm>
    </>
  )
}

export default memo(NewPlaceForm)
