import { Typography, withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const StyledTypography = withTheme(styled(Typography)`
  ${(props) => props.theme.breakpoints.between('md', 'lg')} {
    font-size: 1.9rem;
  }
`)
