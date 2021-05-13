import React, { memo, useState } from 'react'

import { Button, Box, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import logo from '../../assets/roadabout_transparent.gif'
import CategoryDropdown from '../../components/CategoryDropdown'
import { roadtripGenerate } from '../../components/StartGoalForm/raoadtripGenerate'
import Tutorial from '../../components/Tutorial'
import {
  setMapRoute,
  setMaxRoadtripStops,
  setMessage,
  setRoadtripInfos,
  setUiSelectedCategories,
} from '../../store/actions'
import {
  selectMaxRoadtripStops,
  selectRoadtripStops,
  selectUiSelectedCategories,
  selectUserLocations,
  selectUserHasTutorial,
} from '../../store/selectors'
import { userEntry } from '../../store/ui/types'
import {
  getFirstCategories,
  getSecondCategories,
  getThirdCategories,
} from '../../utils/getCategoriesArray'
import {
  AddButton,
  TagBox,
  TagChip,
  CategoryInputLabel,
  AllDropdowns,
  Dropdownbox,
  AddSection,
  AddText,
  CategoriesFormControl,
  ImgBox,
} from './style'

const SelectCategories = () => {
  const history = useHistory()
  //Loading Animation
  const [loading, setLoading] = useState(false)

  // vars to generate Roadtrip
  const dispatch = useDispatch()
  dispatch(setMaxRoadtripStops({ maxRoadtripStops: 10 }))
  const maxStops = useSelector(selectMaxRoadtripStops())
  const stops = useSelector(selectRoadtripStops())
  const tutorial = useSelector(selectUserHasTutorial())

  const [numberCategory, setNumberCategory] = useState(0)
  const [categories, setCategories] = useState(['', '', ''])
  //Get Data from ChipMap: ids=Array.from(chips.keys()) text=Array.from(chips.values())
  const currentChipMap = useSelector(selectUiSelectedCategories())
  const [chips, setChips] = useState(currentChipMap)
  const [currentChip, setCurrentChip] = useState({ number: '', name: '' })

  const [first, setFirst] = useState('')
  const firstArray = getFirstCategories()
  // Get names of the categories later (depends on the category choosen before)
  const [secondArray, setSecondArray] = useState([{ number: '', name: '' }])
  const [thirdArray, setThirdArray] = useState([{ number: '', name: '' }])

  type infoType = {
    address: string
    categories: { id: string; name: string; primary?: boolean }[]
    coordinates: number[]
    api_key: string
    entry?: userEntry
  }
  //get Location of User
  const userLocations = useSelector(selectUserLocations())

  const getUserLocations = () => {
    const arr = new Array<infoType>()
    if (userLocations) {
      userLocations.forEach(function (place: Record<string, any>) {
        if (place.category) {
          const categoryObj = JSON.parse(place.category)
          const allCategories = new Array<{ id: string; name: string }>()
          categoryObj.forEach((item: { number: string; name: string }) => {
            allCategories.push({ id: item.number, name: item.name })
          })

          const userEntry = {
            public: place.public,
            name: place.name,
            description: place.description,
            latitude: place.latitude,
            longitude: place.longitude,
            category: place.category,
            user_id: place.user_id,
            is_allowed: place.is_allowed,
          }

          arr.push({
            address: place.name || '',
            categories: allCategories,
            coordinates: [place.latitude || 0, place.longitude || 0],
            api_key: place.api_entry_key || '',
            entry: userEntry,
          })
        }
      })
      return arr
    }
    return undefined
  }

  const formChanged = (event: any) => {
    setNumberCategory(event.target.id)
    setCurrentChip({
      number: event.target.value,
      name: event.target.selectedOptions[0].label,
    })

    const index = event.target.id - 1
    if (index === 0) {
      setFirst(event.target.value)
      const second = getSecondCategories(event.target.value)
      setSecondArray(second)
      categories[1] = ''
      categories[2] = ''
    }
    if (index === 1) {
      const third = getThirdCategories(first, event.target.value)
      setThirdArray(third)
      categories[2] = ''
    }
    const hideLastDropdown: number = +event.target.id - 1
    if (event.target.value === '') {
      setNumberCategory(hideLastDropdown)
      if (categories[hideLastDropdown - 1]) {
        const keyValue = categories[hideLastDropdown - 1].split(/(?<=^\S+)\s/)
        setCurrentChip({ number: keyValue[0], name: keyValue[1] })
      }
    }

    categories[index] =
      event.target.value + ' ' + event.target.selectedOptions[0].label
  }

  const addChip = () => {
    if (currentChip.name !== '') {
      const newMap = new Map(chips)
      newMap.set(currentChip.number, currentChip.name)
      setChips(newMap)
      setFirst('')
      setFirst('null')
      setCategories(['', '', ''])
      setNumberCategory(0)
      setCurrentChip({ number: '', name: '' })
    }
  }

  const handleDelete = (chipToDelete: any) => () => {
    const newMap = new Map(chips)
    newMap.delete(chipToDelete)
    setChips(newMap)
  }

  return (
    <Box my="auto">
      {tutorial[1] ? <Tutorial openBool={tutorial} /> : ''}
      <div>
        {loading ? (
          <ImgBox>
            <img src={logo} alt="loading animation" height="100%" />
          </ImgBox>
        ) : (
          <div>
            <Box textAlign="center" id="category_observe">
              <TagBox component="ul">
                {Array.from(chips).map((data) => {
                  let icon

                  return (
                    <li>
                      <TagChip
                        icon={icon}
                        value={data[0]}
                        label={data[1]}
                        onDelete={handleDelete(data[0])}
                      />
                    </li>
                  )
                })}
              </TagBox>
              <Dropdownbox>
                <Typography variant="h6">
                  Füge hier beliebig viele Über- und Unterkategorien hinzu :)
                </Typography>
                <AllDropdowns
                  onChange={(e: any) => {
                    formChanged(e)
                  }}
                >
                  <CategoriesFormControl>
                    <CategoryInputLabel id="Kategorie1">
                      Überkategorie
                    </CategoryInputLabel>
                    <CategoryDropdown
                      label="Kategorie1"
                      id={1}
                      options={firstArray}
                      name="category1"
                      selectedValue={first}
                    />
                  </CategoriesFormControl>
                  {numberCategory >= 1 && (
                    <CategoriesFormControl>
                      <CategoryInputLabel id="Kategorie2">
                        1. Unterkategorie
                      </CategoryInputLabel>
                      <CategoryDropdown
                        label="Kategorie2"
                        id={2}
                        options={secondArray}
                        name="category2"
                      />
                    </CategoriesFormControl>
                  )}
                  {numberCategory > 1 && thirdArray[1] && (
                    <CategoriesFormControl>
                      <CategoryInputLabel id="Kategorie3">
                        2. Unterkategorie
                      </CategoryInputLabel>
                      <CategoryDropdown
                        label="Kategorie3"
                        id={3}
                        options={thirdArray}
                        name="category3"
                      />
                    </CategoriesFormControl>
                  )}
                  <br></br>
                </AllDropdowns>
                {currentChip.name ? (
                  <AddSection id="category_add">
                    <AddText>{currentChip.name}</AddText>
                    <AddButton onClick={addChip}>Hinzufügen</AddButton>
                  </AddSection>
                ) : (
                  ' '
                )}
                {Array.from(chips.keys()).length > 0 ? (
                  <div>
                    <br></br>
                    <Typography variant="h6">
                      Fertig ausgewählt? Generiere jetzt deinen Roadtrip!
                    </Typography>
                    <Button
                      onClick={async () => {
                        setLoading(true)
                        dispatch(
                          setUiSelectedCategories({
                            selectedCategoriesMap: chips,
                          })
                        )

                        const userLocationData = getUserLocations()

                        const dataArray: string[] = Array.from(chips.keys())
                        const response = await roadtripGenerate(
                          stops,
                          maxStops,
                          dataArray,
                          userLocationData
                        )
                        if (response) {
                          dispatch(setMapRoute({ mapRoute: response.coorArr }))
                          dispatch(
                            setRoadtripInfos({
                              roadtripInfos: response.infoArr,
                            })
                          )
                          if (dataArray.length > 0) history.push('/step/:3')
                          else
                            dispatch(
                              setMessage({
                                message: `Vervollständige bitte zuerst den zweiten Schritt. Du brauchst min. eine Kategorie.`,
                              })
                            )
                        }
                      }}
                    >
                      Generiere
                    </Button>
                  </div>
                ) : (
                  ''
                )}
              </Dropdownbox>
            </Box>
          </div>
        )}
      </div>
    </Box>
  )
}

export default memo(SelectCategories)
