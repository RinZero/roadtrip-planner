import { Input, withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const StyledInput = withTheme(styled(Input)`
  margin-bottom: ${(props) => props.theme.spacing(2)}px;
`)
