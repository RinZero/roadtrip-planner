/* eslint-disable prettier/prettier */
import React, { memo, useState } from 'react'

import { truncate } from 'fs'

import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Input,
  Switch,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  withTheme,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

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

const NewPlaceForm = () => {
  const { register, getValues } = useForm()
  const [currentRadio, setCurrentRadio] = useState('privat')
  const [lngError, setLngError] = useState(false)
  const [latError, setLatError] = useState(false)
  const [lngHelperText, setLngHelperText] = useState('')
  const [latHelperText, setLatHelperText] = useState('')

  const radioChanged = (event: any) => {
    setCurrentRadio(event.target.value)
  }

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
        <TextField id="name-place" label="Name" variant="outlined" />
        <TextField
          id="description-place"
          label="Beschreibung"
          // placeholder="..."
          multiline
          rowsMax={4}
          variant="outlined"
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
              radioChanged(e)
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
      </StyledForm>
    </>
  )
}

export default memo(NewPlaceForm)
