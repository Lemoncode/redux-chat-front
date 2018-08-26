# Intro

In this sample we will extract the socket management from the container
and create a saga to handle this.

A good starting point: https://github.com/kuy/redux-saga-chat-example

# Steps

- First let's define actions for:
  - Connecting (EnrollRoom).
  - Disconnect from room.
  - Handle errors ? 
  - Handle disconnection ? 
  - Handle read single chat message.
  - Handle read chat message (list of messages).
We will add ID's for the actions.

_./src/common/actionIds.js_

```diff
export const actionIds = {
  SETUP_SESSION_INFO: '[1] Store nickname and room name.',
+ ENROLL_ROOM_REQUEST: '[2] Send a request to the server informing nickname and room to enroll',
+ DISCONNECT: '[3] User wants to disconnect',
+ ON_DISCONNECT: '[4] Server notifies disconnection',
+ MESSAGE_RECEIVED: '[5] Chat message received from socket',
+ MESSAGE_LIST_RECEIVED: '[6] Chat message list received from socket',
}
```
Let's append this actions to the _actions/index_ file.

_./src/actions/index.js_

```javascript
export const EnrollRoomRequest = (nickname, room) => ({
  type: actionIds.ENROLL_ROOM_REQUEST,
  payload: { nickname, room }
});

export const DisconnectRoomRequest = () => ({
  type: actionIds.DISCONNECT,  
});

export const OnDisconnect = () => ({
  type: actionIds.ON_DISCONNECT,  
});

export const OnMessageReceived = (message) => ({
  type: actionIds.MESSAGE_RECEIVED, 
  payload: message,
});

export const OnMessageListReceived = (messageList) => ({
  type: actionIds.MESSAGE_LIST_RECEIVED, 
  payload: messageList,
});
```

> Could it be a good idea to refactor? We could split and create two files _lobbyActions_, _chatActions_.

- Before creating the reducers let's move the message mappers from the _chat.container.business_ to
_chatlog.mapper.js_, and perform a rename on the function names.

_./src/reducers/chat-log.business.js_

```javascript
export const mapApiSingleMessageToStateModel = (message) => ({
  user: message.user,
  text: message.text,
});

export const mapApiMessagesToStateModel = (messages) => 
  messages.map((msg) => ({
    user: msg.userId,
    text: msg.text,
  }));
```

> We can remove that functions from _chat.container.business.js_

- Then let's create a reducer that will hold the chat information.

_./src/reducers/chat-log.js_

```javascript
import { actionIds } from '../common';
import { mapApiSingleMessageToStateModel, mapApiMessagesToStateModel } from './chat-log.business';

// TODO: Javi Calzado update to new refactor, do not use string structure
// use message structure
const defaultState = () => [];


export const chatLogReducer = (state = defaultState(), action) => {
  switch (action.type) {
    case actionIds.MESSAGE_RECEIVED:
      return handleMessageReceived(state, action.payload);
    case actionIds.MESSAGE_LIST_RECEIVED:
      return handleMessageListReceived(state, action.payload);

  }

  return state;
}

export const handleMessageReceived = (state, message) => ([
  ...state,
  mapApiSingleMessageToStateModel(message),
]);

export const handleMessageListReceived = (state, messageList) => ([
  ...state,
  mapApiMessagesToStateModel(messageList),
]);
```