# Bug fix
How I debug the issue

## first phase
first, I noticed the websocket connection error, so I checked the websocket config, it is connected to where the react server run (window.location.origin), but since the websocket server is running in the backend (localhost:3001), so I changed it to localhost:3001.

then after that, I got CORS error trying to connect to localhost:3001, so I added cors middleware, and add allow all in the CORS attribute to the websocket server, this resolve the CORS issue.

but after doing all of that, the main bug still occuring

## second phase
after some debugging, I notice there's "reading from null.conversationId" error, after tracing the error, I found out that the function "postMessage" in client Home.js calls an async function "postMessage" but doesn't use await to wait for the response, therefore the returned value is just a promise not the actual value, so I added the await.

the "reading from null.conversationId" error has been resolved, but the main bug hasn't been solved yet.

after further tracing, I found out that in "addMessageToConversation" function, we directly mutate the state "conversation" (which should not be done in react) and setting the state "conversation" with itself, therefore no re-render triggerred.

so now I know the cause of the bug of why the *newest message doesn't appear instantly* is because the component is not re-rendering because of the explanation above, then I copy the state to new object, mutate the object, and set it to the state, so re-render will happen when new message is submitted.

(ps. I also found out when we starting a new conversation, there's also this bug, I also fixed it)

## third phase
Now for the message not displayed in chronological order, I found out that the messages retrieved from the database is sorted by createdAt in DESC order, so I change it to ascending, and also adjust the "latestMessageText" attribute in the conversation.

## fourth phase (additional)
I found out the chat order in the sidebar is not updated when a new message is submitted (the convo at the top should be the convo with the newest message just as like usual chat app should do), so I also adjusted it to also update the sidebar chats

## tools
I used google, chatGPT for understanding the syntax and libraries used, also I search functions related to the libraries (sequelize, socket.io, others) from the docs to get better understanding.