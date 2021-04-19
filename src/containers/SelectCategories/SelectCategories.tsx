import React, { memo, useState } from 'react'

import {
  Button,
  withTheme,
  Box,
  Chip,
  Typography,
  InputLabel,
  FormControl,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import logo from '../../assets/roadabout_transparent.gif'
import CategoryDropdown from '../../components/CategoryDropdown'
import { roadtripGenerate } from '../../components/StartGoalForm/raoadtripGenerate'
import {
  setMapRoute,
  setMaxRoadtripStops,
  setProgressStep,
  setRoadtripInfos,
  setUiSelectedCategories,
} from '../../store/actions'
import {
  selectMaxRoadtripStops,
  selectRoadtripStops,
  selectUiSelectedCategories,
  selectUserLocations,
} from '../../store/selectors'
import { userEntry } from '../../store/ui/types'
import { LocationState } from '../../store/user/types'
import {
  getFirstCategories,
  getSecondCategories,
  getThirdCategories,
} from '../../utils/getCategoriesArray'

const StartButton = withTheme(styled(Button)`
  background-color: #71b255;
  box-shadow: 0px 3px 6px 0px #b1b1b1;
  color: white;
  margin-top: ${(props) => props.theme.spacing(2)}px;
  padding: ${(props) => props.theme.spacing(2)}px;
  width: 80%;
  &:hover,
  &:active {
    background-color: #355727;
  }
`)

const AddButton = withTheme(styled(Button)`
  background-color: #71b255;
  box-shadow: 0px 3px 6px 0px #b1b1b1;
  color: white;
  height: ${(props) => props.theme.spacing(5)}px;
  &:hover,
  &:active {
    background-color: #355727;
  }
`)

const TagBox = withTheme(styled(Box)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex: 0 0 100%;
  gap: ${(props) => props.theme.spacing(2)}px;
  list-style: none;
  padding: 0;
  margin-top: 0;
`)

const TagChip = withTheme(styled(Chip)`
  padding: ${(props) => props.theme.spacing(2.5)}px
    ${(props) => props.theme.spacing(0.5)}px;
  border-radius: 15px;
  font-size: ${(props) => props.theme.spacing(2)}px;
`)

const CategoryInputLabel = withTheme(styled(InputLabel)`
  margin-left: ${(props) => props.theme.spacing(2)}px;
`)

const AllDropdowns = withTheme(styled(Box)`
  display: block;
  width: 100%;
  ${(props) => props.theme.breakpoints.up('lg')}: {
    display: flex;
    justify-content: left;
  }
`)

const Dropdownbox = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`)

const AddSection = withTheme(styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: ${(props) => props.theme.spacing(2)}px;
`)

const AddText = withTheme(styled(Box)`
  border: 1px solid black;
  border-radius: 15px;
  padding: ${(props) => props.theme.spacing(1)}px;
  margin-right: ${(props) => props.theme.spacing(4)}px;
`)

const CategoriesFormControl = withTheme(styled(FormControl)`
  margin: ${(props) => props.theme.spacing(1.5)}px;
  min-width: ${(props) => props.theme.spacing(25)}px;
`)

const ImgBox = withTheme(styled(Box)`
  padding: ${(props) => props.theme.spacing(10)}px 0;
  margin: ${(props) => props.theme.spacing(5)}px auto;
  background-color: #f6f6f6;
  width: 50vw;
  height: 50vh;
`)

const SelectCategories = () => {
  //Loading Animation
  const [loading, setLoading] = useState(false)

  // vars to generate Roadtrip
  const dispatch = useDispatch()
  dispatch(setMaxRoadtripStops({ maxRoadtripStops: 10 }))
  const maxStops = useSelector(selectMaxRoadtripStops())
  const stops = useSelector(selectRoadtripStops())

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
            user_id: place.user.id,
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
    <>
      <div>
        {loading ? (
          <ImgBox>
            <img src={logo} alt="loading animation" height="100%" />
          </ImgBox>
        ) : (
          <div>
            <Box>
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
                  <AddSection>
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
                    <StartButton
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
                          dispatch(setProgressStep({ progressStep: '3' }))
                        }
                      }}
                    >
                      Generiere
                    </StartButton>
                  </div>
                ) : (
                  ''
                )}
              </Dropdownbox>
            </Box>
          </div>
        )}
      </div>
    </>
  )
}

export default memo(SelectCategories)
