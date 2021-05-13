import React, { memo } from 'react'

import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import AdminTable from '../../components/AdminTable'
import {
  selectAdminUsers,
  selectUserLocations,
  selectUserIsAdmin,
} from '../../store/selectors'
import { StyledBox } from './style'

const AdminPage = () => {
  const history = useHistory()
  const locations = useSelector(selectUserLocations())
  const users = useSelector(selectAdminUsers())
  const isAdmin = useSelector(selectUserIsAdmin())
  // redirect if user is no admin
  if (!isAdmin) history.push('/')

  return (
    <StyledBox>
      {users && users?.length > 0 ? (
        <>
          <Typography variant="h2">Hallo Admin</Typography>
          <p>
            Hier kannst du NutzerInnen zum Admin machen oder löschen und Orte
            veröffentlichen oder löschen.
          </p>
          <AdminTable obj={users} title={'NutzerInnen'} />
          <AdminTable obj={locations} title={'Orte'} />
        </>
      ) : (
        `hier gibt's nichts zu sehen`
      )}
    </StyledBox>
  )
}

export default memo(AdminPage)
