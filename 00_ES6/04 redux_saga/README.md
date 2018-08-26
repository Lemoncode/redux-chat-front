# Intro

In this sample we will extract the socket management from the container
and create a saga to handle this.

A good starting point: https://github.com/kuy/redux-saga-chat-example

# Steps

- Let's install _redux-saga_.

```bash
npm install redux-saga;
```

- Let's define actions for:
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
+ SEND_MESSAGE:'[7] Send message to the server',
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

export const sendMessage = (message) => ({
  type: actionIds.SEND_MESSAGE, 
  payload: message,
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
> Usually this would be time to create unit tests and ensure the reducer is behaving properly (just to progress with the tutorial testing will be covered later on).

- Now let's start with the Saga.

- First we need a _root_ saga and a _flow_ saga that will be always waiting for 
room enrollment and handling messages (input / output), right now let's keep it
simple (we will go filling _flow_ saga step by step):

_./src/sagas/index.js_

```javascript
import { messageFactory } from '../api/chat'
import io from 'socket.io-client';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import {actionIds} from '../common';
import {
  EnrollRoomRequest, DisconnectRoomRequest, OnDisconnect, OnMessageReceived, 
  OnMessageListReceived, SendMessage
} from '../actions';

function* flow() {
  while (true) {
  }
}

export function* rootSaga() {
  yield fork(flow);
}
```

- We will wait for the room enrollement action.

_./src/sagas/index.js_

```diff
function* flow() {
  while (true) {
+   let { payload } = yield take(actionIds.ENROLL_ROOM_REQUEST);    
  }
}
```

- Before connecting the socket let's copy from _chat.container.business.js_ the function named
_establishRoomSocketConnection_ (rather we could place this in a _api_ or _common_ folder),
let's append this helper at the bottom of the file.

_./src/sagas/business.js_

```javascript
import { createSocket } from '../../api'

export const establishRoomSocketConnection = (nickname, room) => {
    // TODO: move this to env variable
    const baseUrl = 'http://localhost:3000';

    const socketParams = {
      url: baseUrl,
      channel: room,
      options: {
        query: `user=${nickname}`
      },
    };
    
    return createSocket(socketParams);        
}
```

- Next step we will connect with the socket, we will create a separate
function that will return a promise, that promise will be handled by the _flow_ saga (wait 
for it), on the connection event we will send a request to the socked to receive all chat log
from the room that we have connected.

_./src/sagas/index.js_

```diff
+ function connect(sessionInfo) {  
+  const socket = establishRoomSocketConnection(sessionInfo.nickname, sessionInfo.room);
+   socket.on('connect', () => {
+     socket.emit('messages');
+     resolve(socket);
+   });
+ }

function* flow() {
  while (true) {
    let { payload } = yield take(`${roomEnrollmentRequest}`);
+    const socket = yield call(connect, {nickname: payload.nickname, room: payload.room});
  }
}
```

- We will create a channel that will establish all the socket event listeners
(message, messages, disconnect..), this will let us listen for actions in the channel to be launched and another
saga will listen to this channel and dispatch them.

_./src/sagas/index.js_

```javascript
function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('message', (message) => {
      emit(OnMessageReceived(message));
    });
    socket.on('messages', (messageList) => {
      emit(OnMessageListReceived(messageList));
    });
    socket.on('disconnect', e => {
      // TODO: handle
    });
    socket.on('error', (error) => {
      // TODO: handle
    });

    return () => {};
  });
}
```

- Now let's open two paralel sagas:

  - The first one will be used to read from the socket:
    -  This saga, will call the initial _subscription_ saga.
    - Setup an infinite loop waiting for actions from the channel
    - Disptaching and action.
    - This _while(true) loop can be broken from outside (we will see how) 

_./src/sagas/index.js_

```javascript
function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}
```
- The second one will be used to write to the socket.
  - _while(true) loop.
  - Wait for a _SendMessage_ action.
  - send it using _socket.emit_

_./src/sagas/index.js_

```javascript
function* write(socket) {
  while (true) {
    const { payload } = yield take(actionIds.SEND_MESSAGE);
    socket.emit('message', payload);
  }
}
```

- Let's launch both tasks in parallell (fork).

_./src/sagas/index.js_

```javascript
function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}
```

- Le'ts add this saga to the flow we are implementing.

_./src/sagas/index.js_

```diff
function* flow() {
  while (true) {
    let { payload } = yield take(actionIds.ENROLL_ROOM_REQUEST);
    const socket = yield call(connect, {nickname: payload.nickname, room: payload.room});    
+   const task = yield fork(handleIO, socket);
  }
}
```

- Now that we have both sagas reading and writing, what are we missing? wait for the disconnect action.

_./src/sagas/index.js_

```diff
function* flow() {
  while (true) {
    let { payload } = yield take(actionIds.ENROLL_ROOM_REQUEST);
    const socket = yield call(connect, {nickname: payload.nickname, room: payload.room});
    const task = yield fork(handleIO, socket);
+    const action = yield take(DisconnectRoomRequest);
+    socket.disconnect();
  }
}
```

Let's create a _rootSaga_ that will be the public entry point.

_./src/sagas/index.js_

```javascript
export function* rootSaga() {
  yield fork(flow);
}
```

- Is time to setup the saga middleware and add our _rootSaga_ to the loop.

_./src/store.js_

```diff
import { createStore, applyMiddleware, compose } from 'redux';
import { reducers } from './reducers';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import ReduxThunk from 'redux-thunk';
+ import createSagaMiddleware from 'redux-saga';
import { history } from './history';
+ import {rootSaga} from './sagas';

// Add redux dev tool support
 const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

+ const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  connectRouter(history)(reducers),
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      ReduxThunk,
+     sagaMiddleware,      
    ),
  ),
); 

+ sagaMiddleware.run(rootSaga);
```

- Let's check that we are on track, we will launch the application and place some breakpoints to ensure sagas
is up and running (nothing will be displayed on screen).

```
npm start
```

> Expected result, no console errors, breakpoint on _rootSaga_ stops, that's it.

- Let's start configuring the chat redux container and start updating the chat react container. We will proceed
step by step.

First let's expose the _EnrollRoomRequest_ to the container.

We will import the _EnrollRoomrequest_ action.

_./src/pages/chat/chat.container.jsx_

```diff
import React from 'react';
import PropTypes from 'prop-types';
import { messageFactory } from '../../api/chat'
import { connect } from 'react-redux';
+ import { EnrollRoomRequest } from '../../actions';
import { ChatComponent } from './chat.component';
import {
  establishRoomSocketConnection,
  mapApiSingleMessageToViewmodel,
  mapApiMessagesToViewmodel
} from './chat.container.business'
```

_./src/pages/chat/chat.container.jsx_

```diff
ChatContainerInner.propTypes = {
  sessionInfo: PropTypes.object,
+  enrollRoomRequest : PropTypes.function,
};

const ChatContainerReact = ChatContainerInner;

const mapStateToProps = (state) => ({
  sessionInfo: state.sessionInfoReducer,
})

const mapDispatchToProps = (dispatch) => ({
+  enrollRoomRequest: (nickname, room) => dispatch(EnrollRoomRequest(nickname, room)),
});

export const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatContainerReact);
```

- Now it's time to replace the chat inner component method _enrollRoom_ with the action that the chat saga is waitin for
to connect the socket.

```diff
export class ChatContainerInner extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      currentMessage: '',
      chatLog: [],
    };    
    this.socket = null;
    this.messageFactory = null;
  }
  
  enrollRoom = () => {
-    this.socket = establishRoomSocketConnection(this.props.sessionInfo.nickname, this.props.sessionInfo.room);
-    this.messageFactory = messageFactory(this.props.sessionInfo.room, this.props.sessionInfo.nickname);
-    this.setupSocketListeners(this.socket);
+    this.props.enrollRoomRequest(this.props.sessionInfo.nickname, this.props.sessionInfo.room);
  }

  disconnectfromRoom = () => {
    this.socket.disconnect();
  }
```






