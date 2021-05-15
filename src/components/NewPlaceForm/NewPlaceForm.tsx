import React, { ChangeEvent, memo, useEffect, useState } from 'react'

import {
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  Box,
  Button,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { setMessage } from '../../store/actions'
import { selectUserLocations, selectUserToken } from '../../store/selectors'
import { FormInputUserEntry } from '../../utils/additionalTypes'
import { createPlace, editPlace, placeType } from '../../utils/CreateNewPlace'
import {
  getAllCategories,
  getAllSelectedCategories,
} from '../../utils/getCategoriesArray'
import { initUserData } from '../../utils/initUserData'
import { StyledRadioGroup, StyledForm } from './style'

type PropsForForm = {
  match: Record<string, any>
}

const NewPlaceForm = (props: PropsForForm) => {
  const isAddMode = !props.match.params.id
  const locations = useSelector(selectUserLocations())
  const token = useSelector(selectUserToken())
  const dispatch = useDispatch()

  const { register, handleSubmit, setValue } = useForm()
  const [currentRadio, setCurrentRadio] = useState('privat')
  const [currentCategories, setCurrentCategories] = useState(
    new Array<{ name: string }>()
  )
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
      attributes: {
        public: currentRadio === 'privat' ? false : true,
        name: data.name,
        description: data.description,
        latitude: data.latitude,
        longitude: data.longitude,
        category: categoryData.length === 0 ? '' : JSON.stringify(categoryData),
      },
    }

    place.attributes.id = !isAddMode
      ? (props.match.params.id.substring(1) as number)
      : undefined
    const response = !isAddMode
      ? await editPlace(place, props.match.params.id.substring(1), token)
      : await createPlace(place, token)

    if (
      response.status &&
      (response.status === 'ok' || response.status === 'created')
    )
      await initUserData(token, dispatch)
    // Get response
    if (typeof response.message === 'string') {
      dispatch(setMessage({ message: response.message }))
    } else {
      const arr: Array<Record<string, any>> = []
      response.forEach(function (item: Record<string, any>) {
        if (item[1]) {
          arr.push(item[1].pop())
        }
      })
      const str = arr.join(' ')
      dispatch(setMessage({ message: str }))
    }
  }

  useEffect(() => {
    if (!isAddMode) {
      const idNumber: number = +props.match.params.id.substring(1)
      const place = locations
        ? locations.find((location) => {
            return ((location.id as unknown) as number) === idNumber
          })
        : undefined
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
            onChange={(e: ChangeEvent<Record<string, any>>, value) => {
              setCurrentCategories(value)
            }}
            value={currentCategories}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Kategorien" />
            )}
          />
          <Button type="submit">
            {!isAddMode ? 'Ort bearbeiten' : 'Neuen Ort erstellen'}
          </Button>
        </StyledForm>
      </Box>
    </>
  )
}

export default memo(NewPlaceForm)
