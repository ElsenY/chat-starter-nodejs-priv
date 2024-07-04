const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id", "lastOpenUser1", "lastOpenUser2"],
      order: [[Message, "createdAt", "ASC"]],
      include: [
        { model: Message },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;

        // rename to lastOpened
        convoJSON.lastOpened = convoJSON.lastOpenUser2;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;

        // rename to lastOpened
        convoJSON.lastOpened = convoJSON.lastOpenUser1;
      }

      // delete unused property
      delete convoJSON.lastOpenUser1;
      delete convoJSON.lastOpenUser2;

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText = convoJSON.messages[convoJSON.messages.length - 1].text;
      conversations[i] = convoJSON;
    }

    // sort the conversations based on last message, so the latest message will appear on top in the sidebar
    conversations.sort((a, b) => {
      const MessA = a.messages
      const MessB = b.messages
      return MessB[MessB.length - 1].createdAt - MessA[MessA.length - 1].createdAt
    })

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});


router.put("/update-last-read", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const reqBody = req.body;
    const conv = await Conversation.findOne({
      where: {
        id: reqBody.conversation_id
      },
    })

    convJSON = conv.toJSON()

    let updateCol

    if (convJSON.user1Id === req.user.id) {
      updateCol = "lastOpenUser1"
    } else if (convJSON.user2Id == req.user.id) {
      updateCol = "lastOpenUser2"
    } else {
      res.sendStatus(404)
    }

    await Conversation.update(
      { [updateCol]: new Date() },
      {
        where: {
          id: reqBody.conversation_id,
        },
      },
    );

    res.json()
  } catch (error) {
    next(error);
  }
})

module.exports = router;
