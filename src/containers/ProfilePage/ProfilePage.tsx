import React, { memo } from 'react'

import { Box } from '@material-ui/core'

const ProfilePage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <h1>Profil</h1>
    </Box>
  )
}

export default memo(ProfilePage)
