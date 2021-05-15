import { TextField, withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const StyledTextfield = withTheme(styled(TextField)`
  margin-bottom: ${(props) => props.theme.spacing(0.4)}px;
`)
