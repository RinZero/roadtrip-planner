import React, { ChangeEvent, memo, useEffect, useState } from 'react'

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

import {
  selectUserId,
  selectUserLocations,
  selectUserToken,
} from '../../store/selectors'
import { LocationState } from '../../store/user/types'
import { FormInputUserEntry } from '../../utils/additionalTypes'
import {
  createPlace,
  editPlace,
  findLocationById,
  placeType,
} from '../../utils/CreateNewPlace'
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
type PropsForForm = {
  match: Record<string, any>
}

const NewPlaceForm = (props: PropsForForm) => {
  const isAddMode = !props.match.params.id
  const locations = useSelector(selectUserLocations())
  const userID = useSelector(selectUserId())
  const token = useSelector(selectUserToken())

  const { register, handleSubmit, setValue } = useForm()
  const [currentRadio, setCurrentRadio] = useState('privat')
  const [currentCategories, setCurrentCategories] = useState(
    new Array<{ name: string }>()
  )
  const [currentCategoriesSet, setCurrentCategoriesSet] = useState(
    new Set<{ name: string }>()
  )
  const [responseMessage, setResponseMessage] = useState('')

  //for frontend validation numbers
  const [lngError, setLngError] = useState(false)
  const [latError, setLatError] = useState(false)
  const [lngHelperText, setLngHelperText] = useState('')
  const [latHelperText, setLatHelperText] = useState('')

  //get all categories
  const allCategories = getAllCategories()

  const checkDigetInput = (
    event: ChangeEvent<HTMLInputElement>,
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
    if (latLng === 'latitude') {
      setLatError(error)
      setLatHelperText(errorString)
    } else if (latLng === 'longitude') {
      setLngError(error)
      setLngHelperText(errorString)
    }
  }

  const onFormSubmit = async (data: FormInputUserEntry) => {
    const categoryData = getAllSelectedCategories(currentCategories)
    const place: placeType = {
      type: 'user_entry',
      userId: userID,
      attributes: {
        public: currentRadio === 'privat' ? false : true,
        name: data.name,
        description: data.description,
        latitude: data.latitude,
        longitude: data.longitude,
        category: categoryData.length === 0 ? '' : JSON.stringify(categoryData),
      },
    }
    if (!isAddMode) {
      place.attributes.id = props.match.params.id[1] as number
      const response = await editPlace(place, props.match.params.id[1], token)
      // Get response messages
      if (response.includes('bearbeitet')) {
        setResponseMessage(response)
      } else {
        setResponseMessage('Hat leider nicht funktioniert')
      }
    } else {
      const response = await createPlace(place)
      // Get response messages
      if (response.includes('erstellt')) {
        setResponseMessage(response)
      } else {
        const arr: Array<Record<string, any>> = []
        response.forEach(function (item: Record<string, any>) {
          if (item[1]) {
            arr.push(item[1].pop())
          }
        })
        const str = arr.join(' ')
        setResponseMessage(str)
      }
    }
  }

  useEffect(() => {
    if (!isAddMode) {
      const place = findLocationById(
        props.match.params.id[1],
        locations as LocationState[]
      )
      if (place) {
        setValue('name', place.name)
        setValue('description', place.description)
        setValue('latitude', place.latitude)
        setValue('longitude', place.longitude)
        const radioValue = place.public ? 'öffentlich' : 'privat'
        setCurrentRadio(radioValue)
        const selectedCategoriesJSON = place.category
          ? JSON.parse(place.category)
          : []
        const names = new Array<{ name: string }>()
        const data = new Array<{ name: string; number: string }>()
        selectedCategoriesJSON.forEach(
          (item: { number: string; name: string }) => {
            names.push({ name: item.name })
            data.push({ name: item.name, number: item.number })
          }
        )
        setCurrentCategories(names)
      }
    }
  }, [])

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
          <TextField
            fullWidth
            id="name-place"
            label="Name"
            name="name"
            inputRef={register}
            variant="outlined"
            inputProps={{ maxlength: 50, minlength: 3 }}
          />
          <TextField
            fullWidth
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

          <TextField
            fullWidth
            id="latitude"
            name="latitude"
            label="Breitengrad"
            type="number"
            placeholder="47.1234"
            variant="outlined"
            inputRef={register}
            error={latError}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              checkDigetInput(e, 180)
            }}
            inputProps={{ step: '0.000001', max: 180, min: -180 }}
            helperText={latHelperText}
          />
          <TextField
            fullWidth
            id="longitude"
            name="longitude"
            label="Längengrad"
            type="number"
            inputRef={register}
            placeholder="13.1234"
            variant="outlined"
            error={lngError}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
            onChange={(e: any, value) => {
              setCurrentCategories(value)
            }}
            value={currentCategories}
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
