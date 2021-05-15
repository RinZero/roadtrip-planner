import { Button, withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const InfoButton = withTheme(styled(Button)`
  height: ${(props) => props.theme.spacing(5)}px;
  margin-right: ${(props) => props.theme.spacing(0.5)}px;
`)
