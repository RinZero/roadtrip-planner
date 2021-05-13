import { withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const NewPlaceStyles = withTheme(styled.div`
  max-width: 70%;
  padding: ${(props) => props.theme.spacing(10)}px 0;
  display: flex;
  flex-direction: column;
  height: 90vh;
  justify-content: space-around;
`)
