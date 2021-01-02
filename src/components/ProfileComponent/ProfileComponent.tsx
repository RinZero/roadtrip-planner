import React, { memo } from "react";
import { Button, Avatar, makeStyles, Theme } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

// Styles hinzufügen Art 1
const useStyles = makeStyles((theme: Theme) => ({
  profileBox: {
    margin: "50px auto",
  },
  profileH3: {
    fontSize: "30px",
    margin: "20px 0 5px",
  },
  profilePicture: {
    width: 291,
    height: 291,
    display: "block",
    margin: "0 auto",
  },
  infoButton: {
    background: "white",
    border: 0,
    borderRadius: 15,
    textTransform: "none",
    boxShadow: "0px 3px 6px 0px #B1B1B1",
    color: "#B1B1B1",
    fontSize: "20px",
    height: 40,
    width: 87,
    margin: "0 3px",
  },
  editButton: {
    borderRadius: "15px",
    background: "#71B255",
    boxShadow: "0px 3px 6px 0px #B1B1B1",
    color: "white",
    height: 40,
    minWidth: 40,
    margin: "0 3px",
  },
}));

const ProfileComponent = () => {
  const classes = useStyles();
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
  );
};
export default memo(ProfileComponent);
