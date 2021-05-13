import { withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const EditRoadtripPageStyles = withTheme(styled.div`
  max-width: 70%;
  margin: auto;
  padding: ${(props) => props.theme.spacing(12)}px 0
    ${(props) => props.theme.spacing(10)}px 0;

  ${(props) => props.theme.breakpoints.up('md')} {
    height: calc(100vh - 40px);
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
`)
