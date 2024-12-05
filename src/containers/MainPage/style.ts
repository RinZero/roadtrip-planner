import { withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const MainPageStyles = withTheme(styled.div`
  max-width: 70%;
  padding: ${(props) => props.theme.spacing(12)}px 0
    ${(props) => props.theme.spacing(10)}px 0;
  display: flex;
  flex-direction: column;
  ${(props) => props.theme.breakpoints.up('md')} {
    height: calc(100vh - 40px);
    //40px come from LogoImg in App.css (maybe remove it??)
  }
`)
