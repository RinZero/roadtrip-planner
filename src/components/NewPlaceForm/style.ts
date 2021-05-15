import { Button, RadioGroup, TextField, withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const StyledForm = withTheme(styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)}px;
`)

export const StyledRadioGroup = withTheme(styled(RadioGroup)`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`)
export const StyledNumberInput = withTheme(styled(TextField)`
  display: none;
`)
