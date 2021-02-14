/* eslint-disable prettier/prettier */
import React, { ChangeEvent, memo, useState, useEffect } from 'react'

import { Select, withTheme } from '@material-ui/core'
import styled from 'styled-components'

const CategorieSelect = withTheme(styled(Select)`
  border-radius: 15px;
  box-shadow: 0px 3px 6px 0px #b1b1b1;
  color: #707070;
  border: 1px solid #ced4da;
  padding: 10px 0 10px 10px;
`)

type CategorieSelectProps = {
  label: string
  id: number
  options: {
    number: string
    name: string
  }[]
  name: string
  selectedValue?: string
}

const CategoryDropdown = (props: CategorieSelectProps) => {
  const { label, id, options, name, selectedValue } = props
  const [value, setValue] = useState('')

  // Reset first Dropdown when Submit
  useEffect(() => {
    if (selectedValue) setValue(selectedValue)
  })

  const dropdownChanged = (event: ChangeEvent<HTMLButtonElement>) => {
    const id: number = +event.target.id
    const value = event.target.value
    setValue(value)
  }

  return (
    <>
      <CategorieSelect
        native
        label={label}
        value={value}
        onChange={(e: ChangeEvent<HTMLButtonElement>) => {
          dropdownChanged(e)
        }}
        inputProps={{
          name: name,
          id: id,
        }}
      >
        {options.map((currentOption) => {
          return (
            <option
              label={currentOption.name}
              value={currentOption.number}
              selected={selectedValue === currentOption.name}
            >
              {currentOption.name}
            </option>
          )
        })}
      </CategorieSelect>
    </>
  )
}
export default memo(CategoryDropdown)
