import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
}));

const Chat = ({ conversation, setActiveChat }) => {
  const classes = useStyles();
  const { otherUser } = conversation;
  const [unreads, setUnreads] = useState()

  // use efefct to count how many unreads
  useEffect(() => {
    let tempUnreads = 0
    // reverse message to count unreads
    const tempMsgs = conversation.messages.slice().reverse()

    const lastOpened = new Date(conversation.lastOpened)

    for (let val of tempMsgs) {
      const msgDate = new Date(val.createdAt)
      // if the message sent is us we should have read it right
      // we check from bottom up if the message is from other user, then we check if we have opened the convo after the the message sent
      if (otherUser.id === val.senderId && msgDate > lastOpened) {
        tempUnreads++
      } else {
        break
      }
    }

    setUnreads(tempUnreads)
  }, [conversation.messages.length, conversation.lastOpened])

  const handleClick = async (conversation) => {
    await setActiveChat(conversation.otherUser.username);

    const lastReadData = {
      conversation_id: conversation.id
    }
    await axios.put("/api/conversations/update-last-read", lastReadData)
    setUnreads(0)
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} unreads={unreads} />
    </Box>
  );
};

export default Chat;
