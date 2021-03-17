/* eslint-disable prettier/prettier */
import React, { memo, useState } from 'react'

import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  withTheme,
  Box,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectUserId } from '../../store/selectors'
import { checkDigetInputLng, checkDigetInputLat } from '../../utils/CheckLatLng'
import { createPlace } from '../../utils/CreateNewPlace'
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
  justify-content: space-between;
  flex-direction: row !important;
`)

const StyledButton = withTheme(styled(Button)`
  color: #ffffff;
  background-color: #71b255;
  padding: ${(props) => props.theme.spacing(2.5)}px;
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
`)
const StyledTextField = withTheme(styled(TextField)`
  width: 100%;
`)
const StyledFormControl = withTheme(styled(FormControl)`
  width: 100%;
`)

const NewPlaceForm = () => {
  const [responseMessage, setResponseMessage] = useState('')

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

  //get all categories
  const [categories, setCategories] = useState(new Set())
  const allCategories = getAllCategories()

  const userID = useSelector(selectUserId())

  const checkDigetInput = (event: any) => {
    const type = event.target.id
    const errorMessage = ''
    const error = false
    let obj = { error, errorMessage }

    if (type === 'lat') {
      obj = checkDigetInputLat(event)
    } else {
      obj = checkDigetInputLng(event)
    }

    setError(type, obj.errorMessage, obj.error)
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
      {responseMessage !== '' ? (
        <Box>
          <h4>{responseMessage}</h4>
        </Box>
      ) : (
        ''
      )}
      <StyledForm>
        <StyledTextField
          id="name-place"
          label="Name"
          variant="outlined"
          onChange={(e: any) => {
            setCurrentName(e.target.value)
          }}
        />
        <StyledTextField
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

        <StyledTextField
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
        <StyledTextField
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

        <StyledFormControl component="fieldset">
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
        </StyledFormControl>

        <Autocomplete
          multiple
          fullWidth={true}
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
          onClick={async () => {
            const allCategoryNames = getCategoryNames()
            const categoryData = getAllSelectedCategories(allCategoryNames)
            const place = {
              type: 'user_entry',
              userId: userID,
              attributes: {
                public: currentRadio === 'privat' ? false : true,
                name: currentName,
                description: currentDescription,
                latitude: currentLat,
                longitude: currentLng,
                category: JSON.stringify(categoryData),
              },
            }
            const response = await createPlace(place)
            // Get response messages
            if (response.includes('erstellt')) {
              setResponseMessage(response)
            } else {
              const arr: any[] = []
              response.forEach(function (item: any) {
                arr.push(item[1].pop())
              })
              const str = arr.join(' ')
              setResponseMessage(str)
            }
          }}
        >
          Neuen Ort erstellen
        </StyledButton>
      </StyledForm>
    </>
  )
}

export default memo(NewPlaceForm)
