import React, { memo, useEffect, useState } from 'react'

import { Typography, withTheme } from '@material-ui/core'
import { useDropzone } from 'react-dropzone'
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

const Container = withTheme(styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => props.theme.spacing(5)}px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`)

const ThumbsContainer = withTheme(styled.aside`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${(props) => props.theme.spacing(2)}px;
`)

const Thumb = withTheme(styled.div`
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

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`

const ThumbImg = styled.img`
  display: block;
  width: auto;
  height: 100%;
`
type DropzoneProps = {
  maxFiles?: number
}
const Dropzone = (props: DropzoneProps) => {
  const { maxFiles = 1 } = props
  const [files, setFiles] = useState<{ name: string; preview: string }[]>([])
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: '.jpeg,.jpg,.png,.gif',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
    maxFiles: maxFiles,
  })

  const thumbs = files.map((file) => (
    <Thumb key={file.name}>
      <ThumbInner>
        <ThumbImg src={file.preview} />
      </ThumbInner>
    </Thumb>
  ))

  useEffect(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <>
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <Typography variant="body1">
          Bilder für den Upload auswählen, oder Bildateien ziehen und ablegen
        </Typography>
        <Typography variant="body2">
          (Nur *.jpg, *.png und *.gif Bilder sind erlaubt)
        </Typography>
      </Container>
      <ThumbsContainer>{thumbs}</ThumbsContainer>
    </>
  )
}

export default memo(Dropzone)
