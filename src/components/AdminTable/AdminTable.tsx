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
  Switch,
} from '@material-ui/core'
import { withTheme } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectUserToken } from '../../store/selectors'
import { LocationState, UserState } from '../../store/user/types'
import { adminEditPlace, adminEditUser } from '../../utils/admin'
import { deleteUser } from '../../utils/AuthService'
import { deletePlace } from '../../utils/CreateNewPlace'
import { initUserData } from '../../utils/initUserData'

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
const StyledTableCell = withTheme(styled(TableCell)`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${(props) => props.theme.spacing(20)}px;
`)

const AdminTable = (props: {
  obj?: LocationState[] | UserState[]
  title: string
}) => {
  const { ...attributes } = props.obj
  const title = props.title
  const columnTitles = Object.keys(attributes[0])
  const columnContent = props.obj
  const token = useSelector(selectUserToken())
  const dispatch = useDispatch()

  const handleDelete = async (id: number) => {
    const response =
      title === 'Orte'
        ? await deletePlace(token, id.toString())
        : await deleteUser(token, id)
    await initUserData(token, dispatch)
  }

  const handleEdit = async (id: number) => {
    const response =
      title === 'Orte'
        ? await adminEditPlace(token, id)
        : await adminEditUser(token, id)
    await initUserData(token, dispatch)
  }

  return (
    <>
      <h4>{title}</h4>
      <StyledTableContainer component={Paper}>
        <Table aria-label="customized table">
          <StyledTableHead>
            <TableRow>
              {columnTitles.map((title) => {
                return <StyledTableCell align="right">{title}</StyledTableCell>
              })}
              <TableCell align="right">Löschen</TableCell>
              <TableCell align="right">Bearbeiten</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {columnContent?.map((row: LocationState | UserState) => (
              <StyledTableRow key={row.id}>
                {Object.values(row).map((attribute) => {
                  return attribute?.toString().length > 20 ? (
                    <StyledTableCell align="right">
                      {attribute?.toString()}
                    </StyledTableCell>
                  ) : (
                    <TableCell align="right">{attribute?.toString()}</TableCell>
                  )
                })}
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      const id: number = +row.id
                      handleDelete(id)
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <Switch
                    checked={
                      title === 'Orte'
                        ? (row as LocationState).is_allowed
                        : (row as any).is_admin // remove any by rename isAdmin to is_admin
                    }
                    onChange={() => {
                      const id: number = +row.id
                      handleEdit(id)
                    }}
                    name="switch"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
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
