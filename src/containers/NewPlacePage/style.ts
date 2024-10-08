import { withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const NewPlaceStyles = withTheme(styled.div`
  max-width: 70%;
  padding: ${(props) => props.theme.spacing(12)}px 0
    ${(props) => props.theme.spacing(10)}px 0;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: space-around;
  ${(props) => props.theme.breakpoints.up('sm')} {
    padding-bottom: ${(props) => props.theme.spacing(6)}px;
  }
`)
