import React, { memo } from 'react'

import {
  TableCell,
  Paper,
  TableBody,
  TableHead,
  TableRow,
  Table,
  TableContainer,
  IconButton,
} from '@material-ui/core'
import { withTheme } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import styled from 'styled-components'

import { LocationState, UserState } from '../../store/user/types'

const StyledTableRow = withTheme(styled(TableRow)`
  &:nth-child(odd) {
    background-color: lightgrey;
  }
`)
const StyledTableHead = withTheme(styled(TableHead)`
  background-color: lightblue;
`)
const StyledTableContainer = withTheme(styled(TableContainer)`
  border: black 2px solid;
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
`)

// Was wenn ich da Props mitgebe welche Spalten es geben soll
//z.B. für User: name, email
// für UserEntry: erlaubt oder nicht, name, lat, lng, beschreibung, kategorie, etc
// jeweils mit Löschen & bei UserEntry öffentlich schalten button
const AdminTable = (props: {
  obj?: LocationState[] | UserState[]
  title: string
}) => {
  // TODO fix error in console "props.obj is undefined"
  const { ...attributes } = props.obj
  const title = props.title
  const columnTitles = Object.keys(attributes[0])
  const columnContent = props.obj

  return (
    <>
      <h4>{title}</h4>
      <StyledTableContainer component={Paper}>
        <Table aria-label="customized table">
          <StyledTableHead>
            <TableRow>
              {columnTitles.map((title) => {
                return <TableCell align="right">{title}</TableCell>
              })}
              <TableCell align="right">Löschen</TableCell>
              <TableCell align="right">Bearbeiten</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {columnContent?.map((row: LocationState | UserState) => (
              <StyledTableRow key={row.id}>
                {Object.values(row).map((attribute) => {
                  return (
                    <TableCell align="right">{attribute?.toString()}</TableCell>
                  )
                })}
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      // eslint-disable-next-line no-console
                      console.log('LÖSCH DAS ' + typeof row + ' ' + row.id)
                      const foo = title === 'Users' ? 'user' : 'userEntry'
                      // eslint-disable-next-line no-console
                      console.log(foo)
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      // eslint-disable-next-line no-console
                      console.log('bearbeite DAS')
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  )
}

export default memo(AdminTable)
