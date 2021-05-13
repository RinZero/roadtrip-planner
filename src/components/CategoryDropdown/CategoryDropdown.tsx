import React, { ChangeEvent, memo, useState, useEffect } from 'react'

import { CategorieSelect } from './style'

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
              key={currentOption.number}
              label={currentOption.name}
              value={currentOption.number}
              defaultValue={selectedValue}
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
