import { Box, ListItem, withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const LocationListItem = withTheme(styled(ListItem)`
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  border: 1px solid rgb(0 0 0 / 16%);
  overflow: auto;
  margin-bottom: ${(props) => props.theme.spacing(1.2)}px;
`)

export const LocationBox = withTheme(styled(Box)`
  max-height: ${(props) => props.theme.spacing(16)}px;
  overflow: auto;
`)
