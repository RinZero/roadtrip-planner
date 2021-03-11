/* eslint-disable prettier/prettier */
import React, { memo, useState } from 'react'

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
  Button,
  withTheme,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import {
  getAllCategories,
  getAllSelectedCategories,
} from '../../utils/getCategoriesArray'

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
  width: 100%;
  color: #ffffff;
  background-color: #71b255;
  padding: ${(props) => props.theme.spacing(2.5)}px;
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
`)

const NewPlaceForm = () => {
  const { register, getValues } = useForm()
  const [currentRadio, setCurrentRadio] = useState('privat')

  //for frontend validation numbers
  const [lngError, setLngError] = useState(false)
  const [latError, setLatError] = useState(false)
  const [lngHelperText, setLngHelperText] = useState('')
  const [latHelperText, setLatHelperText] = useState('')

  //get all categories
  const [categories, setCategories] = useState(new Set())
  const allCategories = getAllCategories()

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

  const categoriesChanged = (event: any) => {
    const newSet = new Set(categories)
    newSet.add(event.target.value)
    setCategories(newSet)
  }

  const getCategoryNames = () => {
    const allTags = document.getElementsByClassName('MuiChip-label')
    const allTagsArr = new Array(allTags.length)
    for (let i = 0; i < allTags.length; i++) {
      allTagsArr[i] = allTags[i].innerHTML
    }
    return allTagsArr
  }

  return (
    <>
      <StyledForm>
        <TextField
          id="name-place"
          label="Name"
          variant="outlined"
          inputRef={register}
        />
        <TextField
          id="description-place"
          label="Beschreibung"
          multiline
          rowsMax={4}
          variant="outlined"
          inputRef={register}
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
          inputRef={register}
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
          inputRef={register}
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

        <Autocomplete
          multiple
          id="categories"
          options={allCategories}
          getOptionLabel={(option) => option.name}
          filterSelectedOptions
          onChange={(e: any) => {
            categoriesChanged(e)
          }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Kategorien" />
          )}
        />
        <StyledButton
          onClick={() => {
            const allCategoryNames = getCategoryNames()
            // eslint-disable-next-line no-console
            console.log(allCategoryNames)
            const getCategoryData = getAllSelectedCategories(allCategoryNames)
            // get name array with choosen stops
            const values = getValues()
            // eslint-disable-next-line no-console
            console.log(values)
            // eslint-disable-next-line no-console
            console.log(getCategoryData)
            // eslint-disable-next-line no-console
            console.log(currentRadio)
          }}
        >
          Neuen Ort erstellen
        </StyledButton>
      </StyledForm>
    </>
  )
}

export default memo(NewPlaceForm)
