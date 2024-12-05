import { withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const CreateRoadtripPageStyles = withTheme(styled.div`
  max-width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`)

export const StyledOptionContainer = withTheme(styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  margin: 0 ${(props) => props.theme.spacing(2)}px;
  flex-direction: row;
  ${(props) => props.theme.breakpoints.down('sm')} {
    flex-direction: column;
    align-items: center;
    margin-top: ${(props) => props.theme.spacing(2)}px;
  }
`)
