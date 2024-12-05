import React, { memo } from 'react'

import { Typography, Box } from '@material-ui/core'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'

import { setDropzoneFiles } from '../../store/actions'
import { selectDropzoneFiles } from '../../store/selectors'
import {
  Container,
  Thumb,
  ThumbImg,
  ThumbsContainer,
  ThumbInner,
} from './style'

type ImageDropzoneProps = {
  maxFiles?: number
}
const ImageDropzone = (props: ImageDropzoneProps) => {
  const { maxFiles = 1 } = props
  const dispatch = useDispatch()
  const files = useSelector(selectDropzoneFiles())
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: '.jpeg,.jpg,.png,.gif',
    onDrop: (acceptedFiles) => {
      dispatch(
        setDropzoneFiles({
          dropzoneFiles: acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        })
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

  // useEffect(() => {
  //   files.forEach((file) => URL.revokeObjectURL(file.preview))
  // }, [files])

  return (
    <Box display="flex" alignItems="center">
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <Typography variant="body1">Bilder für den Upload auswählen</Typography>
        <Typography variant="body2">
          (Nur *.jpg, *.png und *.gif sind erlaubt)
        </Typography>
      </Container>
      <ThumbsContainer>{thumbs}</ThumbsContainer>
    </Box>
  )
}

export default memo(ImageDropzone)
