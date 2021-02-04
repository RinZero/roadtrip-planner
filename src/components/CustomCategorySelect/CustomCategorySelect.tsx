import React, { ChangeEvent, memo } from 'react'

import { Button, Select, withTheme } from '@material-ui/core'
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
  const [state, setState] = React.useState({
    category1: '',
    category2: '',
    category3: '',
  })

  // const [chipData, setChipData] = React.useState([])

  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Tag 1' },
    { key: 1, label: 'Tag 2' },
    { key: 2, label: 'Tag 3' },
    { key: 3, label: 'Tag 4' },
  ])
  const [showCategories, setShowCategories] = React.useState(false)
  const onClick = () => {
    showCategories ? setShowCategories(false) : setShowCategories(true)
  }
  const addChip = () => {
    showCategories ? setShowCategories(false) : setShowCategories(true)
  }

  const handleDelete = (chipToDelete: any) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    )
  }
  // eslint-disable-next-line no-console
  console.log(state.category1)
  // eslint-disable-next-line no-console
  console.log(state.category2)
  // eslint-disable-next-line no-console
  console.log(state.category3)
  const [valueCategory, setValueCategory] = React.useState(0)
  // eslint-disable-next-line no-console
  console.log(valueCategory)
  const CustomisedSelections = (props: CategorieSelectProps) => {
    const { label, id, options, name } = props

    const handleChange = (event: ChangeEvent<HTMLButtonElement>) => {
      const name = event.target.name
      setState({
        ...state,
        [name]: event.target.value,
      })
    }

    const test = (id: number) => {
      switch (id) {
        case 1:
          return state.category1
        case 2:
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
    </>
  )
}
export default memo(CustomCategorySelect)
