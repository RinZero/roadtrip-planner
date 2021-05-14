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
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { logOutSuccess, setMessage, updateUser } from '../../store/actions'
import { selectUserToken } from '../../store/selectors'
import { deleteRoadtrip, deleteUser } from '../../utils/AuthService'
import { deletePlace } from '../../utils/CreateNewPlace'
import { initUserData } from '../../utils/initUserData'
import { InfoButton } from './style'
type DialogProps = {
  objectType: string
  id: string
  text?: string
}

export const DialogDelete = (props: DialogProps) => {
  const { objectType, id, text } = props
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
    if (objectType === 'Ort' || objectType === 'Roadtrip') {
      const response =
        objectType === 'Ort'
          ? await deletePlace(token, id)
          : await deleteRoadtrip(token, id)
      if (response.status && response.status === 204) {
        await initUserData(token, dispatch)
        dispatch(setMessage({ message: `Dein ${objectType} wurde gelöscht` }))
      }
    } else if (objectType === 'Profil') {
      const response = await deleteUser(token, (id as unknown) as number)
      if (response.status && response.status === 204) {
        dispatch(
          updateUser({
            userName: '',
            email: '',
            password: '',
            picture: '',
          })
        )
        handleCloseDelete()
        dispatch(logOutSuccess())
        history.push('/')
      }
      setIsOpen(false)
    }
  }

  return (
    <>
      {objectType === 'Profil' ? (
        <InfoButton onClick={handleClickOpenDelete}>Profil löschen</InfoButton>
      ) : (
        <IconButton
          onClick={async () => {
            handleClickOpenDelete()
          }}
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
          <InfoButton onClick={handleCloseDelete}>Abbrechen</InfoButton>
          <InfoButton onClick={handleDelete} color="secondary">
            Löschen
          </InfoButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default memo(DialogDelete)
