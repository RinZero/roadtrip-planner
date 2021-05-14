import { Button, withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const InfoButton = withTheme(styled(Button)`
  background-color: white;
  box-shadow: 0px 3px 6px 0px #b1b1b1;
  height: ${(props) => props.theme.spacing(5)}px;
  margin-right: ${(props) => props.theme.spacing(0.5)}px;
`)
