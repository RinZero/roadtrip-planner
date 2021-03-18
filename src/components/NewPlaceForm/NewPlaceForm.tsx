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
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectUserId } from '../../store/selectors'
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
  flex-direction: row;
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

const NewPlaceForm = () => {
  const { register, handleSubmit } = useForm()
  const [currentRadio, setCurrentRadio] = useState('privat')
  const [responseMessage, setResponseMessage] = useState('')

  //for frontend validation numbers
  const [lngError, setLngError] = useState(false)
  const [latError, setLatError] = useState(false)
  const [lngHelperText, setLngHelperText] = useState('')
  const [latHelperText, setLatHelperText] = useState('')

  //get all categories
  const [categories, setCategories] = useState(new Set())
  const allCategories = getAllCategories()

  const userID = useSelector(selectUserId())

  const checkDigetInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    max: number
  ) => {
    const type = event.target.id
    const num: number = +event.target.value
    const errorMessage1 = num > max ? 'zu groß' : ''
    const errorMessage2 = num < -max ? 'zu klein' : ''
    const error = num <= max && num >= -max ? false : true
    const errorMessage = errorMessage1 !== '' ? errorMessage1 : errorMessage2
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

  const categoriesChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const newSet = new Set(categories)
    newSet.add(event.currentTarget.value)
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

  type IFormInput = {
    name: string
    description: string
    lat: number | null
    lng: number | null
  }

  const onFormSubmit = async (data: IFormInput) => {
    const allCategoryNames = getCategoryNames()
    const categoryData = getAllSelectedCategories(allCategoryNames)
    const place = {
      type: 'user_entry',
      userId: userID,
      attributes: {
        public: currentRadio === 'privat' ? false : true,
        name: data.name,
        description: data.description,
        latitude: data.lat,
        longitude: data.lng,
        category: categoryData.length === 0 ? '' : JSON.stringify(categoryData),
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
      <Box>
        <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
          <StyledTextField
            id="name-place"
            label="Name"
            name="name"
            inputRef={register}
            variant="outlined"
            inputProps={{ maxlength: 50, minlength: 3 }}
          />
          <StyledTextField
            id="description-place"
            name="description"
            label="Beschreibung"
            inputRef={register}
            multiline
            rows={2}
            rowsMax={4}
            variant="outlined"
            inputProps={{ maxlength: 250 }}
          />

          <StyledTextField
            id="lat"
            name="lat"
            label="Breitengrad"
            type="number"
            placeholder="47.1234"
            variant="outlined"
            inputRef={register}
            error={latError}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              checkDigetInput(e, 180)
            }}
            inputProps={{ step: '0.000001', max: 180, min: -180 }}
            helperText={latHelperText}
          />
          <StyledTextField
            id="lng"
            name="lng"
            label="Längengrad"
            type="number"
            inputRef={register}
            placeholder="13.1234"
            variant="outlined"
            error={lngError}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              checkDigetInput(e, 90)
            }}
            inputProps={{ step: '0.000001', max: 90, min: -90 }}
            helperText={lngHelperText}
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Sichtbarkeit</FormLabel>
            <StyledRadioGroup
              aria-label="Sichtbarkeit"
              name="radio"
              value={currentRadio}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setCurrentRadio(e.currentTarget.value)
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

          <StyledButton type="submit">Neuen Ort erstellen</StyledButton>
        </StyledForm>
      </Box>
    </>
  )
}

export default memo(NewPlaceForm)
