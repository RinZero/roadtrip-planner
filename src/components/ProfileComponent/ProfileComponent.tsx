import React, { MouseEvent, useState, memo } from 'react'

import {
  Box,
  Popper,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Divider,
  ClickAwayListener,
  Link,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import { DialogDelete } from '../../components/DialogDelete'
import { updateUser, setMessage } from '../../store/actions'
import {
  selectUserPicture,
  selectUserEmail,
  selectUserName,
  selectUserToken,
  selectUserId,
  selectUserIsAdmin,
  selectDropzoneFiles,
} from '../../store/selectors'
import { deleteUser, editUser } from '../../utils/user'
import ImageDropzone from '../ImageDropzone'
import ChangePasswordDialog from './ChangePasswordDialog'
import {
  ProfileBox,
  PopperBox,
  IconBox,
  ProfileAvatar,
  TypographyMarginSmall,
  StyledButton,
} from './style'

const ProfileComponent = () => {
  const token = useSelector(selectUserToken())
  const userId = useSelector(selectUserId())
  const name = useSelector(selectUserName())
  const email = useSelector(selectUserEmail())
  const profilePic = useSelector(selectUserPicture())
  const isAdmin = useSelector(selectUserIsAdmin())

  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null)
  const [id, setId] = useState<string | undefined>(undefined)
  const [values, setValues] = useState({
    open: false,
  })

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
    setValues({ ...values, open: !values.open })
    setId(values.open ? 'simple-popper' : undefined)
  }

  const handleClickAway = () => {
    setValues({ ...values, open: false })
    setAnchorEl(null)
    setId(values.open ? 'simple-popper' : undefined)
  }

  type IFormInput = {
    userName: string
    email: string
    image: (File & {
      preview: string
    })[]
  }

  const dispatch = useDispatch()
  const image = useSelector(selectDropzoneFiles())

  const { register, handleSubmit } = useForm()
  const onFormSubmit = async (data: IFormInput) => {
    const inputData = new FormData()
    inputData.append('[user]username', data.userName)
    inputData.append('[user]email', data.email)
    inputData.append('[user]image', image[0])
    inputData.append('[user]id', userId)

    const response = await editUser(inputData, token, userId)
    if (response.status === 200) {
      dispatch(
        updateUser({
          userName: data.userName,
          email: data.email,
          picture:
            response.data.data.attributes.image === null
              ? undefined
              : response.data.data.attributes.image?.url,
        })
      )
      dispatch(
        setMessage({
          message: 'Dein Profil wurde bearbeitet.',
          status: 'success',
        })
      )
    } else if (response.status === 422) {
      const arr: Array<Record<string, any>> = []
      response.data.forEach(function (item: Record<string, any>) {
        if (item[1]) {
          arr.push(item[1].pop())
        }
      })
      const str = arr.join(' ')
      dispatch(setMessage({ message: str, status: 'error' }))
    }
    //close popup
    handleClickAway()
  }

  return (
    <>
      <ProfileBox>
        <ProfileAvatar
          aria-label="Profilbild"
          alt="Profilbild"
          src={profilePic}
        />
        <Typography variant="h3">{name}</Typography>
        <TypographyMarginSmall variant="h3">{email}</TypographyMarginSmall>
        <StyledButton
          aria-describedby={id}
          aria-label="Profil bearbeiten"
          title="Hier das Profil bearbeiten"
          type="button"
          onClick={handleClick}
        >
          <EditIcon />
        </StyledButton>
        {isAdmin ? (
          <>
            <Link component={RouterLink} to={`/admin`} variant="h6">
              Admin
            </Link>
          </>
        ) : (
          ''
        )}
        <Popper
          id={id}
          open={values.open}
          anchorEl={anchorEl}
          placement="bottom"
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            <PopperBox onSubmit={handleSubmit(onFormSubmit)}>
              <Typography variant="h3">Bearbeiten:</Typography>
              <FormControl>
                <InputLabel>Name</InputLabel>
                <Input
                  name="userName"
                  inputRef={register}
                  defaultValue={name}
                  inputProps={{ minlength: 3, maxlength: 50, required: true }}
                />
              </FormControl>
              <Divider />
              <FormControl>
                <InputLabel>E-Mail</InputLabel>
                <Input
                  name="email"
                  inputRef={register}
                  defaultValue={email}
                  inputProps={{ type: 'email', required: true }}
                />
              </FormControl>
              <Divider />
              <Box
                display="flex"
                alignItems="flex-start"
                flexDirection="column"
              >
                <Box mb={1}>
                  <Typography variant="h6">Profilbild:</Typography>
                </Box>
                <ImageDropzone />
              </Box>

              <Divider />

              <IconBox>
                <DialogDelete
                  objectType="Profil"
                  id={userId}
                  onDelete={deleteUser}
                  text="Bist du dir wirklich sicher? Das Löschen deines Profils kann nicht mehr rückgängig
                    gemacht werden. Damit gehen auch deine erstellten Roadtrips
                    und Orte verloren."
                />
                <ChangePasswordDialog />
                <StyledButton type="submit">Speichern</StyledButton>
              </IconBox>
            </PopperBox>
          </ClickAwayListener>
        </Popper>
      </ProfileBox>
    </>
  )
}
export default memo(ProfileComponent)
