import { Button, Popover, TextField, withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const StyledPopover = withTheme(styled(Popover)`
  padding: ${(props) => props.theme.spacing(3)}px;
`)

export const StyledPopoverButton = withTheme(styled(Button)`
  border-radius: 15px;
  padding: ${(props) => props.theme.spacing(1)}px
    ${(props) => props.theme.spacing(2)}px;
  background-color: #fff;
`)

export const StyledSubmitButton = withTheme(styled(StyledPopoverButton)`
  color: #fff;
  background-color: #71b255;
  max-width: 80%;
  &:hover,
  &:active {
    background-color: #355727;
  }
`)

export const StyledNewStoppTextField = withTheme(styled(TextField)`
  margin: ${(props) => props.theme.spacing(2)}px 0;
  input,
  label {
    font-size: ${(props) => props.theme.spacing(3)}px;
    margin-left: ${(props) => props.theme.spacing(3.7)}px;
  }
  padding-bottom: ${(props) => props.theme.spacing(1.25)}px;
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  .MuiInput-underline {
    :after {
      content: none;
    }
    :before {
      content: none;
    }
  }
`)
