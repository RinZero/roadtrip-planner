import React, { ChangeEvent, memo } from 'react'

import { Select, withTheme } from '@material-ui/core'
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
  const [valueCategory, setValueCategory] = React.useState(0)
  const CustomisedSelections = (props: CategorieSelectProps) => {
    const { label, id, options, name } = props

    const handleChange = (event: ChangeEvent<HTMLButtonElement>) => {
      const name = event.target.name
      setState({
        ...state,
        [name]: event.target.value,
      })
    }

    return (
      <>
        <CategorieSelect
          native
          label={label}
          value={state.category1}
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
    </>
  )
}
export default memo(CustomCategorySelect)
