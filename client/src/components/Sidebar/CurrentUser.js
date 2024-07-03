import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BadgeAvatar } from "./index";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Menu, MenuItem } from '@mui/material';

const useStyles = makeStyles(() => ({
  root: {
    height: 44,
    marginTop: 23,
    marginLeft: 6,
    display: "flex",
    alignItems: "center",
  },
  subContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
  },
  username: {
    letterSpacing: -0.23,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 17,
  },
  ellipsis: {
    color: "#95A7C4",
    marginRight: 24,
    opacity: 0.5,
    cursor: "pointer",
  },
}));

const CurrentUser = ({ user, logout }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={classes.root}>
      <BadgeAvatar photoUrl={user?.photoUrl} online={true} />
      <Box className={classes.subContainer}>
        <Typography className={classes.username}>{user?.username}</Typography>
        <MoreHorizIcon classes={{ root: classes.ellipsis }} onClick={handleClick} />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => { logout(); handleClose(); }}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default CurrentUser;
