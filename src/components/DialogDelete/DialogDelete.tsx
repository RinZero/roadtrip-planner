import { memo, useState } from 'react'

import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { AxiosResponse } from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { logOutSuccess, setMessage, updateUser } from '../../store/actions'
import { selectUserToken } from '../../store/selectors'
import { initUserData } from '../../utils/initUserData'
import { InfoButton } from './style'
type DialogProps = {
  objectType: string
  id: string
  onDelete(token: string, id: string): Promise<AxiosResponse<unknown>>
  text?: string
}

export const DialogDelete = (props: DialogProps) => {
  const { objectType, id, onDelete, text } = props
  const [isOpen, setIsOpen] = useState(false)
  const token = useSelector(selectUserToken())
  const dispatch = useDispatch()
  const history = useHistory()

  const handleClickOpenDelete = () => {
    setIsOpen(true)
  }

  const handleCloseDelete = () => {
    setIsOpen(false)
  }

  const handleDelete = async () => {
    const response = await onDelete(token, id)
    if (response.status && response.status === 204) {
      await dispatch(
        setMessage({ message: `Dein ${objectType} wurde gelöscht` })
      )
      if (objectType === 'Profil') {
        dispatch(
          updateUser({
            userName: '',
            email: '',
            picture: '',
          })
        )
        handleCloseDelete()
        dispatch(logOutSuccess())
        history.push('/')
      } else if (objectType === 'Ort' || objectType === 'Roadtrip') {
        await initUserData(token, dispatch)
      }
    }
    setIsOpen(false)
  }

  return (
    <>
      {objectType === 'Profil' ? (
        <InfoButton onClick={handleClickOpenDelete} color="secondary">
          Profil löschen
        </InfoButton>
      ) : (
        <IconButton
          onClick={async () => {
            handleClickOpenDelete()
          }}
          aria-label={`${objectType} löschen`}
          title={`Hier deinen ${objectType} löschen`}
        >
          <DeleteIcon />
        </IconButton>
      )}
      <Dialog
        open={isOpen}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{objectType} löschen?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text
              ? text
              : `Bist du dir sicher, dass du deinen ${objectType} löschen möchtest?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <InfoButton color="primary" onClick={handleCloseDelete}>
            Abbrechen
          </InfoButton>
          <InfoButton onClick={handleDelete} color="secondary">
            Löschen
          </InfoButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default memo(DialogDelete)
