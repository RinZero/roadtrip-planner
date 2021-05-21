import { Box, withTheme } from '@material-ui/core'
import styled from 'styled-components'
export const ImgBox = withTheme(styled(Box)`
  padding: ${(props) => props.theme.spacing(10)}px 0;
  margin: ${(props) => props.theme.spacing(5)}px auto;
  width: 50vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-item: center;
`)
