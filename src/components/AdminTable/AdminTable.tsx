import React, { memo, useState } from 'react'

import {
  TableCell,
  Paper,
  TableBody,
  TableRow,
  Table,
  IconButton,
  Switch,
  Typography,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch, useSelector } from 'react-redux'

import { selectUserToken } from '../../store/selectors'
import { LocationState, UserState } from '../../store/user/types'
import { adminEditPlace, adminEditUser } from '../../utils/admin'
import { deleteUser } from '../../utils/AuthService'
import { deletePlace } from '../../utils/CreateNewPlace'
import { initUserData } from '../../utils/initUserData'
import {
  StyledTableContainer,
  StyledTableCell,
  StyledTableHead,
  StyledTableRow,
} from './style'

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
  const [shortString, setShortString] = useState(true)

  const handleDelete = async (id: string) => {
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
      <Typography variant="h3">{title}</Typography>
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
                {Object.values(row).map((attribute) => (
                  <StyledTableCell
                    align="right"
                    isShort={shortString}
                    onClick={() => {
                      setShortString(!shortString)
                    }}
                  >
                    <Typography noWrap={shortString}>
                      {attribute?.toString()}
                    </Typography>
                  </StyledTableCell>
                ))}
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      handleDelete(row.id)
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
