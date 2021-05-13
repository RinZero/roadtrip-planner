import {
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
  withTheme,
} from '@material-ui/core'
import styled from 'styled-components'

export const StyledTableRow = withTheme(styled(TableRow)`
  &:nth-child(odd) {
    background-color: lightgrey;
  }
`)
export const StyledTableHead = withTheme(styled(TableHead)`
  background-color: lightblue;
`)
export const StyledTableContainer = withTheme(styled(TableContainer)`
  border: black 2px solid;
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
`)
export const StyledTableCell = withTheme(styled(TableCell)<{
  isShort: boolean
}>`
  max-width: ${(props) =>
    props.isShort ? props.theme.spacing(25) : props.theme.spacing(80)}px;
`)
