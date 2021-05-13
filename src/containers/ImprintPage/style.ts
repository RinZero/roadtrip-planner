import { Box, withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const ImprintBox = withTheme(styled(Box)`
  padding: ${(props) => props.theme.spacing(12)}px
    ${(props) => props.theme.spacing(2)}px;
  text-align: left;
`)
