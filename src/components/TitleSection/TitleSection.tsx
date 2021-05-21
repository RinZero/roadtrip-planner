import React, { memo } from 'react'

import { Box } from '@material-ui/core'

import { StyledTypography } from './style'

const TitleSection = () => {
  return (
    <Box display="flex" alignItems="center">
      <StyledTypography variant="h1" align="center" id="quote">
        "Roads were made for journeys, not destinations"
      </StyledTypography>
      {/* <Typography variant="body1">Explanation here</Typography> */}
    </Box>
  )
}
export default memo(TitleSection)
