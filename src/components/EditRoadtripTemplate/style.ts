import { Box, Button, ListItem, IconButton, withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const CreateButton = withTheme(styled(Button)`
  width: ${(props) => props.theme.spacing(35)}px;
  padding: ${(props) => props.theme.spacing(2)}px;
  margin-top: ${(props) => props.theme.spacing(2)}px;
`)

export const StyledBox = withTheme(styled(Box)<{ isLaptop: boolean }>`
  margin-top: ${(props) => props.theme.spacing(1.5)}px;
  min-width: ${(props) => props.theme.spacing(25)}px;
  overflow: auto;
  max-height: ${(props) => props.theme.spacing(6.2)}vh;
  .MuiList-root {
    display: inline;
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    width: 25%;
    margin-top: 0px;
    max-height: ${(props) => (props.isLaptop ? '35vh' : '45vh')};
    margin-left: ${(props) => props.theme.spacing(2)}px;
    .MuiListItemSecondaryAction-root {
      top: 28%;
      ${(props) => props.theme.breakpoints.up('md')} {
        top: 50%;
      }
    }
  }
  ${(props) => props.theme.breakpoints.between('md', 'lg')} {
    width: 40%;
  }
`)
export const DragListItem = withTheme(styled(ListItem)`
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  border: 1px solid rgb(0 0 0 / 16%);
  margin-bottom: ${(props) => props.theme.spacing(1.2)}px;
`)

export const ContentBox = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: ${(props) => props.theme.spacing(1)}px;
  ${(props) => props.theme.breakpoints.up('md')} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`)

export const ArrowButton = withTheme(styled(IconButton)`
  padding: 0;
  width: 50%;
  border: 1px solid rgb(0 0 0 / 16%);
  border-radius: 15px;
  color: #707070;
`)
