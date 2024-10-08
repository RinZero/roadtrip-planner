import {
  Box,
  Button,
  Chip,
  InputLabel,
  FormControl,
  withTheme,
} from '@material-ui/core'
import styled from 'styled-components'

export const StartButton = withTheme(styled(Button)`
  margin-top: ${(props) => props.theme.spacing(2)}px;
  padding: ${(props) => props.theme.spacing(2)}px;
  width: 80%;
`)

export const AddButton = withTheme(styled(Button)`
  height: ${(props) => props.theme.spacing(5)}px;
  margin-bottom: ${(props) => props.theme.spacing(2)}px;
`)

export const TagBox = withTheme(styled(Box)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex: 0 0 100%;
  gap: ${(props) => props.theme.spacing(2)}px;
  list-style: none;
  padding: 0;
  margin-top: 0;
`)

export const TagChip = withTheme(styled(Chip)`
  padding: ${(props) => props.theme.spacing(2.5)}px
    ${(props) => props.theme.spacing(0.5)}px;
  border-radius: 15px;
  font-size: ${(props) => props.theme.spacing(2)}px;
`)

export const CategoryInputLabel = withTheme(styled(InputLabel)`
  margin-left: ${(props) => props.theme.spacing(2)}px;
`)

export const AllDropdowns = withTheme(styled(Box)`
  display: block;
  width: 100%;
  ${(props) => props.theme.breakpoints.up('lg')}: {
    display: flex;
    justify-content: left;
  }
`)

export const Dropdownbox = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`)

export const AddSection = withTheme(styled(Box)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: ${(props) => props.theme.spacing(2)}px;
`)

export const AddText = withTheme(styled(Box)`
  border: 1px solid black;
  border-radius: 15px;
  padding: ${(props) => props.theme.spacing(1)}px;
  margin: 0 ${(props) => props.theme.spacing(4)}px
    ${(props) => props.theme.spacing(2)}px;
`)

export const CategoriesFormControl = withTheme(styled(FormControl)`
  margin: ${(props) => props.theme.spacing(1.5)}px;
  min-width: ${(props) => props.theme.spacing(25)}px;
`)
