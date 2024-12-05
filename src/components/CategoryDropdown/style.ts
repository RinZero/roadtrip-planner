import { Select, withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const CategorieSelect = withTheme(styled(Select)`
  border-radius: 15px;
  box-shadow: 0px 3px 6px 0px #b1b1b1;
  color: #707070;
  border: 1px solid #ced4da;
  padding: ${(props) => props.theme.spacing(1.2)}px 0
    ${(props) => props.theme.spacing(1.2)}px
    ${(props) => props.theme.spacing(1.2)}px;
`)
