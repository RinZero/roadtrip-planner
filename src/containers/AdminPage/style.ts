import { Box, withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const StyledBox = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing(12)}px;
  align-items: center;
`)
