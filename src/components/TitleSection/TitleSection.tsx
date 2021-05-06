import React, { memo } from 'react'

import { Box, Typography, withTheme } from '@material-ui/core'
import styled from 'styled-components'

const StyledTypography = withTheme(styled(Typography)`
  ${(props) => props.theme.breakpoints.between('md', 'lg')} {
    font-size: 1.9rem;
  }
`)

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
