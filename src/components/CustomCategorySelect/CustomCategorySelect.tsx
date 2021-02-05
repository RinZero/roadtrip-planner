/* eslint-disable prettier/prettier */
import React, { ChangeEvent, memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  getFirstCategories,
  getNameByID,
  getSecondCategories,
  getThirdCategories,
} from '../../utils/getArrayCategories'
import { setUiSelectedCategories } from '../../store/actions'
import {
  Box,
  Chip,
  FormControl,
  Typography,
  Button,
  Select,
  withTheme,
} from '@material-ui/core'
import styled from 'styled-components'

const CategorieSelect = withTheme(styled(Select)`
  border-radius: 15px;
  box-shadow: 0px 3px 6px 0px #b1b1b1;
  color: #707070;
  margin-bottom: ${(props) => props.theme.spacing(3)}px;
  border: 1px solid #ced4da;
  padding: 10px 26px 10px 12px;
  border-bottom: none;
`)
const TagBox = withTheme(styled(Box)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex: 0 0 100%;
  gap: ${(props) => props.theme.spacing(2)}px;
  list-style: none;
  padding: ${(props) => props.theme.spacing(2)}px;
  margin-top: ${(props) => props.theme.spacing(3)}px;
`)

const TagChip = withTheme(styled(Chip)`
  padding: ${(props) => props.theme.spacing(2.5)}px
    ${(props) => props.theme.spacing(0.5)}px;
  border-radius: 15px;
  font-size: ${(props) => props.theme.spacing(2)}px;
`)

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

const CategoriesFormControl = withTheme(styled(FormControl)`
  margin: ${(props) => props.theme.spacing(3)}px;
  min-width: ${(props) => props.theme.spacing(30)}px;
`)

const CancelButton = withTheme(styled(Button)`
  background-color: #e67676;
  box-shadow: 0px 3px 6px 0px #b1b1b1;
  color: white;
  height: ${(props) => props.theme.spacing(5)}px;
  width: ${(props) => props.theme.spacing(44.25)}px;
  margin-top: ${(props) => props.theme.spacing(3)}px;
  content: 'Start';
  &:hover,
  &:active {
    background-color: #da3535;
  }
`)

const CustomCategorySelect = () => {
  type CategorieSelectProps = {
    label: string
    id: number
    options: {
      number: number
      name: string
    }[]
    name: string
  }

  const dispatch = useDispatch()
  const firstArray = getFirstCategories()

  const [categoriesData, setCategoriesData] = useState(['', '', ''])

  const [first, setFirst] = useState('')
  const [secondFuckingArray, setSecondFuckingArray] = useState([
    { number: 0, name: '' },
  ])
  const [thirdArray, setThirdArray] = useState([{ number: 0, name: '' }])

  const [chipData, setChipData] = useState(new Set<string>())
  const [chipText, setChipText] = useState(new Set())
  const [showCategories, setShowCategories] = useState(false)
  const onClick = () => {
    showCategories ? setShowCategories(false) : setShowCategories(true)
  }
  const addChip = () => {
    showCategories ? setShowCategories(false) : setShowCategories(true)
    for (let i = 2; i >= 0; i--) {
      if (categoriesData[i] !== '') {
        const newSetText = new Set(chipText)
        const newSet = new Set(chipData)
        const n = getNameByID(categoriesData[i])
        newSetText.add(n)
        newSet.add(categoriesData[i])
        setChipData(newSet)
        setChipText(newSetText)
        break
      }
    }
  }

  const handleDelete = (chipToDelete: any) => () => {
    const newSet = new Set(chipData)
    newSet.delete(chipToDelete)
    setChipData(newSet)
  }

  const [valueCategory, setValueCategory] = useState(0)
  const CustomisedSelections = (props: CategorieSelectProps) => {
    const { label, id, options, name } = props

    const handleChange = (event: ChangeEvent<HTMLButtonElement>) => {
      const i: number = +event.target.id - 1
      const v = event.target.value
      categoriesData[i] = v

      if (v === '') {
        if (i === 0) {
          setValueCategory(0)
          setCategoriesData(['', '', ''])
        }
        if (i === 1) {
          setValueCategory(1)
          categoriesData[2] = ''
        }
      } else {
        setValueCategory(id)
        if (i === 0) {
          setFirst(event.target.value)
          const second = getSecondCategories(event.target.value)
          setSecondFuckingArray(second)
        }
        if (i === 1) {
          const third = getThirdCategories(first, event.target.value)
          setThirdArray(third)
        }
      }
    }

    return (
      <>
        <CategorieSelect
          native
          label={label}
          value={categoriesData[id - 1]}
          onChange={(e: ChangeEvent<HTMLButtonElement>) => {
            handleChange(e)
          }}
          inputProps={{
            name: name,
            id: id,
          }}
        >
          <option aria-label="None" value="" />
          {options.map((currentOption) => {
            return (
              <option label={currentOption.name} value={currentOption.number}>
                {' '}
                {currentOption.name}
              </option>
            )
          })}
        </CategorieSelect>
      </>
    )
  }

  return (
    <>
      <Box display="block" width="100%" justifyContent="center">
        {showCategories ? (
          <Box>
            <Typography variant="h6">Kategorie auswählen:</Typography>
            <CategoriesFormControl>
              <CustomisedSelections
                label="Kategorie1"
                id={1}
                options={firstArray}
                name="category1"
              />
              {valueCategory >= 1 && (
                <CustomisedSelections
                  label="Kategorie2"
                  id={2}
                  options={secondFuckingArray}
                  name="category2"
                />
              )}
              {valueCategory > 1 && (
                <CustomisedSelections
                  label="Kategorie3"
                  id={3}
                  options={thirdArray}
                  name="category3"
                />
              )}
              <StartButton onClick={addChip}>Auswählen</StartButton>
              <CancelButton onClick={onClick}>Abbrechen</CancelButton>
            </CategoriesFormControl>
          </Box>
        ) : (
          <StartButton onClick={onClick}>Hinzufügen</StartButton>
        )}
        <TagBox component="ul">
          {Array.from(chipText).map((data) => {
            let icon

            return (
              <li>
                <TagChip
                  icon={icon}
                  label={data}
                  onDelete={handleDelete(data)}
                />
              </li>
            )
          })}
        </TagBox>
        {showCategories ? undefined : (
          <StartButton
            onClick={() => {
              const dataArray: string[] = Array.from(chipData)
              dispatch(
                setUiSelectedCategories({ selectedCategories: dataArray })
              )
            }}
          >
            Weiter
          </StartButton>
        )}
      </Box>
    </>
  )
}
export default memo(CustomCategorySelect)

// TODOS
// 1. Delete funktioniert noch nicht ganz - es steht zwar nicht mehr im set, aber dafür noch im Html -> Fix: immer neues Set erstellen und dann setChipData https://dev.to/ganes1410/using-javascript-sets-with-react-usestate-39eo
// 2. Chip fügt immer das letzte veränderte dazu. Nicht das letzte in der Liste (apfel statt bannane3) -> Fix: Hardcoded 2 weil dass maximal ist
// 3. Linten !!! erste Zeile oben löschen
// 4. Refactor !!! setCategoriesData wird z.B. nie verwendet, da kann was nicht stimmen - vlt ähnliche lösung wie 1. nur mit Array
