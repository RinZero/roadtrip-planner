import { withTheme } from '@material-ui/core'
import styled from 'styled-components'

const getColor = (props: Record<string, any>) => {
  if (props.isDragAccept) {
    return '#00e676'
  }
  if (props.isDragReject) {
    return '#ff1744'
  }
  if (props.isDragActive) {
    return '#2196f3'
  }
  return '#eeeeee'
}

export const Container = withTheme(styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => props.theme.spacing(1)}px;
  margin-right: ${(props) => props.theme.spacing(1)}px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`)

export const ThumbsContainer = withTheme(styled.aside`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${(props) => props.theme.spacing(2)}px;
`)

export const Thumb = withTheme(styled.div`
  display: inline-flex;
  border-radius: 2;
  border: 1px solid #eaeaea;
  margin-bottom: ${(props) => props.theme.spacing(1)}px;
  margin-right: ${(props) => props.theme.spacing(1)}px;
  width: ${(props) => props.theme.spacing(13)}px;
  height: ${(props) => props.theme.spacing(13)}px;
  padding: ${(props) => props.theme.spacing(0.5)}px;
  box-sizing: border-box;
`)

export const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`

export const ThumbImg = styled.img`
  display: block;
  width: auto;
  height: 100%;
`
