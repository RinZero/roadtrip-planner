/* eslint-disable prettier/prettier */
import React, { ChangeEvent, memo, useState } from 'react'

import {
  Box,
  Chip,
  FormControl,
  Typography,
  Button,
  Select,
  withTheme,
} from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
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
    options: string[]
    name: string
  }
  const [state, setState] = useState({
    category1: '',
    category2: '',
    category3: '',
  })

  const [categoriesData, setCategoriesData] = useState(['', '', ''])
  const [index, setIndex] = useState(1)

  // const [chipData, setChipData] = React.useState(
  //   {
  //     0: 'Tag 1',
  //     1: 'Tag 2',
  //     2: 'Tag 3',
  //     3: 'Tag 4'
  //   },
  // )

  const [chipData, setChipData] = useState(new Set())
  const [showCategories, setShowCategories] = useState(false)
  const onClick = () => {
    // eslint-disable-next-line no-console
    console.log('on click --------')
    showCategories ? setShowCategories(false) : setShowCategories(true)
  }
  const addChip = () => {
    // eslint-disable-next-line no-console
    console.log('add chip ------')
    // eslint-disable-next-line no-console
    console.log(state)
    showCategories ? setShowCategories(false) : setShowCategories(true)
    // eslint-disable-next-line no-console
    console.log('Wast ist der index: ' + index)
    for (let i = index; i >= 0; i--) {
      if (categoriesData[i] !== '') {
        // setChipData(chipData.concat(categoriesData[i]))
        chipData.add(categoriesData[i])
        // setChipData([...new Set(chipData)])
        // setChipData({
        //   ...chipData,
        //   [categoriesData[i]]: categoriesData[i],
        // })
        break
      }
    }
  }

  for (const item of Array.from(chipData.values())) {
    // eslint-disable-next-line no-console
    console.log(item)
  }

  // eslint-disable-next-line no-console
  console.log(chipData)
  const handleDelete = (chipToDelete: any) => () => {
    // eslint-disable-next-line no-console
    console.log('DELETE')
    // eslint-disable-next-line no-console
    console.log(chipToDelete)
    chipData.delete(chipToDelete)
    setChipData(chipData)
    // eslint-disable-next-line no-console
    console.log(chipData)
  }

  const [valueCategory, setValueCategory] = useState(0)
  // eslint-disable-next-line no-console
  console.log(valueCategory)
  const CustomisedSelections = (props: CategorieSelectProps) => {
    const { label, id, options, name } = props

    const handleChange = (event: ChangeEvent<HTMLButtonElement>) => {
      const name = event.target.name
      // eslint-disable-next-line no-console
      console.log('HAndle change Name: ' + name)
      // eslint-disable-next-line no-console
      console.log('HAndle change Name: ' + event.target.id)
      const i: number = +event.target.id - 1
      // eslint-disable-next-line no-console
      console.log('neuer index ' + i)
      setIndex(i)
      // eslint-disable-next-line no-console
      console.log('neuer index ' + index)
      setState({
        ...state,
        [name]: event.target.value,
      })

      categoriesData[i] = event.target.value
      // eslint-disable-next-line no-console
      console.log(state)
      // eslint-disable-next-line no-console
      console.log(categoriesData)
    }

    const test = (id: number) => {
      switch (id) {
        case 1:
          return state.category1
        case 2:
          // eslint-disable-next-line no-console
          console.log('etwas ändert sich bei 2: ')
          // eslint-disable-next-line no-console
          console.log(state.category2)
          // if (state.category2 = '') {
          //   // eslint-disable-next-line no-console
          //   console.log("empty")
          //   setValueCategory(id - 1)

          // }
          return state.category2
        case 3:
          return state.category3
        default:
          return null
      }
    }

    return (
      <>
        <CategorieSelect
          native
          label={label}
          value={test(id)}
          onChange={(e: ChangeEvent<HTMLButtonElement>) => {
            handleChange(e)
            setValueCategory(id)
          }}
          inputProps={{
            name: name,
            id: id,
          }}
        >
          <option aria-label="None" value="" />
          {options.map((currentOption) => {
            return <option value={currentOption}> {currentOption}</option>
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
                options={['Apple', 'Orange', 'Banana']}
                name="category1"
              />
              {valueCategory >= 1 && (
                <CustomisedSelections
                  label="Kategorie2"
                  id={2}
                  options={['Apple2', 'Orange2', 'Banana2']}
                  name="category2"
                />
              )}
              {valueCategory > 1 && (
                <CustomisedSelections
                  label="Kategorie3"
                  id={3}
                  options={['Apple3', 'Orange3', 'Banana3']}
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
          {Array.from(chipData).map((data) => {
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
          <StartButton onClick={onClick}>Weiter</StartButton>
        )}
      </Box>
    </>
  )
}
export default memo(CustomCategorySelect)
