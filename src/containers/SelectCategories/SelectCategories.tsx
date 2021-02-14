import React, { memo, useState } from 'react'

import {
  Button,
  withTheme,
  Box,
  Chip,
  FormControl,
  Typography,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import CategoryDropdown from '../../components/CategoryDropdown'
import { roadtripGenerate } from '../../components/StartGoalForm/raoadtripGenerate'
import {
  setMapRoute,
  setMaxRoadtripStops,
  setProgressStep,
  setUiSelectedCategories,
} from '../../store/actions'
import {
  selectMaxRoadtripStops,
  selectRoadtripStops,
} from '../../store/selectors'
import {
  getFirstCategories,
  getSecondCategories,
  getThirdCategories,
} from '../../utils/getCategoriesArray'

const StartButton = withTheme(styled(Button)`
  background-color: #71b255;
  box-shadow: 0px 3px 6px 0px #b1b1b1;
  color: white;
  height: ${(props) => props.theme.spacing(5)}px;
  width: ${(props) => props.theme.spacing(44.25)}px;
  margin-top: ${(props) => props.theme.spacing(3)}px;
  content: 'Start';
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
`)

const TagChip = withTheme(styled(Chip)`
  padding: ${(props) => props.theme.spacing(2.5)}px
    ${(props) => props.theme.spacing(0.5)}px;
  border-radius: 15px;
  font-size: ${(props) => props.theme.spacing(2)}px;
`)

const CategoriesFormControl = withTheme(styled(FormControl)`
  margin: ${(props) => props.theme.spacing(3)}px;
  min-width: ${(props) => props.theme.spacing(30)}px;
`)

const SelectCategories = () => {
  // vars to generate Roadtrip
  const dispatch = useDispatch()
  dispatch(setMaxRoadtripStops({ maxRoadtripStops: 10 }))
  const maxStops = useSelector(selectMaxRoadtripStops())
  const stops = useSelector(selectRoadtripStops())

  const [numberCategory, setNumberCategory] = useState(0)
  const [categories, setCategories] = useState(['', '', ''])
  //Get Data from ChipMap: ids=Array.from(chips.keys()) text=Array.from(chips.values())
  const [chips, setChips] = useState(new Map())
  // eslint-disable-next-line no-console
  console.log(Array.from(chips))

  const [first, setFirst] = useState('')
  const firstArray = getFirstCategories()
  // Get names of the categories later (depends on the category choosen before)
  const [secondArray, setSecondArray] = useState([{ number: '', name: '' }])
  const [thirdArray, setThirdArray] = useState([{ number: '', name: '' }])

  const formChanged = (event: any) => {
    setNumberCategory(event.target.id)

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

    categories[index] =
      event.target.value + ' ' + event.target.selectedOptions[0].label
  }

  const addChip = () => {
    for (let i = categories.length - 1; i >= 0; i--) {
      if (categories[i].length > 2) {
        //split the string: eg. '300 Food and more' to '300' 'Food and more'
        const keyValue = categories[i].split(/(?<=^\S+)\s/)
        const newMap = new Map(chips)
        newMap.set(keyValue[0], keyValue[1])
        setChips(newMap)
        break
      }
    }
    setFirst('')
    setFirst('null')
    setCategories(['', '', ''])
    setNumberCategory(0)
  }

  const handleDelete = (chipToDelete: any) => () => {
    const newMap = new Map(chips)
    newMap.delete(chipToDelete)
    setChips(newMap)
  }

  return (
    <>
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
        <Box display="block" width="100%" justifyContent="center">
          <Box>
            <Typography variant="h6">neue Kategorie auswählen:</Typography>
            <CategoriesFormControl
              onChange={(e: any) => {
                formChanged(e)
              }}
            >
              <CategoryDropdown
                label="Kategorie1"
                id={1}
                options={firstArray}
                name="category1"
                selectedValue={first}
              />
              {numberCategory >= 1 && first !== '' && first !== '0' && (
                <div>
                  <Typography variant="h6">1. Unterkategorie</Typography>
                  <CategoryDropdown
                    label="Kategorie2"
                    id={2}
                    options={secondArray}
                    name="category2"
                  />
                </div>
              )}
              {numberCategory > 1 && thirdArray[1] && (
                <div>
                  <Typography variant="h6">2. Unterkategorie</Typography>
                  <CategoryDropdown
                    label="Kategorie3"
                    id={3}
                    options={thirdArray}
                    name="category3"
                  />
                </div>
              )}
              <br></br>
              <StartButton onClick={addChip}>Hinzufügen</StartButton>
            </CategoriesFormControl>
          </Box>
          <Typography variant="h6">
            Fertig ausgewählt? Generiere jetzt deinen Roadtrip!
          </Typography>
          <StartButton
            onClick={async () => {
              const dataArray: string[] = Array.from(chips.keys())
              const response = await roadtripGenerate(
                stops,
                maxStops,
                dataArray
              )
              dispatch(setMapRoute({ mapRoute: response }))
              dispatch(setProgressStep({ progressStep: '3' }))
            }}
          >
            Generiere
          </StartButton>
        </Box>
      </Box>
    </>
  )
}

export default memo(SelectCategories)
