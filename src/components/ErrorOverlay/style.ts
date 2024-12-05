import { Box, Slide, Paper, withTheme } from '@material-ui/core'
import styled from 'styled-components'

// ErrorOverlay Style

export const OverlayBox = withTheme(styled(Box)`
  z-index: 3;
  position: fixed;
  bottom: 0;
`)

//ErrorMessage Style

export const StyledSlide = withTheme(styled(Slide)`
  width: 100%;
  background-color: white;
`)

export const ImageBox = withTheme(styled(Box)`
  img {
    height: ${(props) => props.theme.spacing(10)}px;
    padding-right: ${(props) => props.theme.spacing(1)}px;
  }
`)

export const StyledPaper = withTheme(styled(Paper)`
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(1)}px;
`)
