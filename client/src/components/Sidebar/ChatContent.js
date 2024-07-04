import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  notReadText: {
    color: "white",
    padding: "10px",
    background: "#3a8dff",
    borderRadius: "50%",
  }
}));

const ChatContent = ({ conversation, unreads }) => {
  const classes = useStyles();

  const { otherUser } = conversation;
  const latestMessageText = conversation.id && conversation.latestMessageText;

  return (
    <Box className={classes.root}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography className={classes.username}>
            {otherUser.username}
          </Typography>
          <Typography className={classes.previewText}>
            {latestMessageText}
          </Typography>
        </Grid>
        {
          unreads > 0 ? <Grid item className={classes.notReadText}>
            <Typography>
              {unreads}
            </Typography>
          </Grid> : <></>
        }

      </Grid>
    </Box>
  );
};

export default ChatContent;
