/* eslint-disable no-console */
import React, { memo } from 'react'

import {
  Button,
  withTheme,
  Box,
  Chip,
  FormControl,
  Typography,
} from '@material-ui/core'
import styled from 'styled-components'

import CustomCategorySelect from '../../components/CustomCategorySelect'

// Art 2
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

const SelectCategories = () => {
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
  return (
    <>
      <Box display="block" width="100%" justifyContent="center">
        {showCategories ? (
          <Box>
            <Typography variant="h6">Kategorie auswählen:</Typography>
            <CategoriesFormControl>
              <CustomCategorySelect />
              <StartButton onClick={addChip}>Auswählen</StartButton>
              <CancelButton onClick={onClick}>Abbrechen</CancelButton>
            </CategoriesFormControl>
          </Box>
        ) : (
          <StartButton onClick={onClick}>Hinzufügen</StartButton>
        )}
        <TagBox component="ul">
          {chipData.map((data) => {
            let icon

            return (
              <li key={data.key}>
                <TagChip
                  icon={icon}
                  label={data.label}
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

export default memo(SelectCategories)
