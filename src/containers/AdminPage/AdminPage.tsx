import React, { memo } from 'react'

import { Box, withTheme } from '@material-ui/core'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import AdminTable from '../../components/AdminTable'
import { selectAdminUsers, selectUserLocations } from '../../store/selectors'

const StyledBox = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing(12)}px;
  align-items: center;
`)

const AdminPage = () => {
  const locations = useSelector(selectUserLocations())
  const users = useSelector(selectAdminUsers())

  return (
    <StyledBox>
      <h2>Hallo Admin</h2>
      <p>
        Hier kannst du NutzerInnen zum Admin machen oder löschen und Orte
        veröffentlichen oder löschen.
      </p>
      <AdminTable obj={users} title={'NutzerInnen'} />
      <AdminTable obj={locations} title={'Orte'} />
    </StyledBox>
  )
}

export default memo(AdminPage)
