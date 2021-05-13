import { Box, Button, TextField, withTheme } from '@material-ui/core'
import styled from 'styled-components'

//StartGoalForm Style

export const StyledForm = withTheme(styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)}px;
  .expand {
    display: block;
  }
  .collapse {
    width: ${(props) => props.theme.spacing(10)}px;
    padding-top: 0px;
    label {
      display: none;
    }
    input {
      font-size: ${(props) => props.theme.spacing(2)}px;
    }
  }
`)

export const StyledButton = withTheme(styled(Button)`
  width: 100%;
  color: #ffffff;
  background-color: #71b255;
  padding: ${(props) => props.theme.spacing(2)}px;
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  &:hover,
  &:active {
    background-color: #355727;
  }
`)

export const AddButton = withTheme(styled(Button)`
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  padding: ${(props) => props.theme.spacing(2)}px;
`)

export const StartGoalTextField = withTheme(styled(TextField)`
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
  margin: ${(props) => props.theme.spacing(2)}px 0;
  input,
  label {
    font-size: ${(props) => props.theme.spacing(3)}px;
    margin-left: ${(props) => props.theme.spacing(3.7)}px;
  }
`)

export const FormBox = withTheme(styled(Box)`
  display: block;
  width: 100%;
  ${(props) => props.theme.breakpoints.up('md')} {
    display: flex;
    justify-content: center;
    gap: ${(props) => props.theme.spacing(5)}px;
  }
`)
