import React, { memo } from 'react'

import { Button, Avatar, makeStyles, Theme } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

// Styles hinzufügen Art 1
const useStyles = makeStyles((theme: Theme) => ({
  profileBox: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(7),
  },
  profileH3: {
    fontSize: '30px',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0.5),
  },
  profilePicture: {
    width: theme.spacing(36),
    height: theme.spacing(36),
    display: 'block',
    margin: '0 auto',
  },
  infoButton: {
    background: 'white',
    textTransform: 'none',
    boxShadow: '0px 3px 6px 0px #B1B1B1',
    color: '#B1B1B1',
    fontSize: '20px',
    height: theme.spacing(5),
    width: theme.spacing(10),
    marginRight: theme.spacing(0.5),
  },
  editButton: {
    background: '#71B255',
    boxShadow: '0px 3px 6px 0px #B1B1B1',
    color: 'white',
    height: theme.spacing(5),
    minWidth: theme.spacing(5),
    marginLeft: theme.spacing(0.5),
  },
}))

const ProfileComponent = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.profileBox}>
        <Avatar
          alt="profile picture"
          src="https://image.freepik.com/free-photo/mand-holding-cup_1258-340.jpg"
          className={classes.profilePicture}
        />
        <h3 className={classes.profileH3}>Name</h3>
        <Button className={classes.infoButton}>Info</Button>
        <Button className={classes.editButton}>
          <EditIcon />
        </Button>
      </div>
    </>
  )
}
export default memo(ProfileComponent)
