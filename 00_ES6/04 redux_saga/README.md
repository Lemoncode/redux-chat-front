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
  ...mapApiMessagesToStateModel(messageList),
]);
```
> Usually this would be time to create unit tests and ensure the reducer is behaving properly (just to progress with the tutorial testing will be covered later on).

- Let's register this reducer into the root reducer.

_./src/reducers/index.js_

```diff
import { combineReducers } from 'redux';
import { sessionInfoReducer } from './session-info';
+ import { chatLogReducer } from './chat-log';

export const reducers = combineReducers({
  sessionInfoReducer,
  chatLogReducer,
});
```

- Now let's start with the Saga.

- First we need a _root_ saga and a _flow_ saga that will be always waiting for 
room enrollment and handling messages (input / output), right now let's keep it
simple (we will go filling _flow_ saga step by step):

_./src/sagas/index.js_

```javascript
import { messageFactory } from '../api/chat'
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import {actionIds} from '../common';
import {
  EnrollRoomRequest, disconnectRoomRequest, onDisconnect, onMessageReceived, 
  onMessageListReceived, SendMessage
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
import { createSocket } from '../api/chat'

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
+ import {establishRoomSocketConnection} from './business';

// ...

+ function connect(sessionInfo) {
+   const socket = establishRoomSocketConnection(sessionInfo.nickname, sessionInfo.room);
+
+  return new Promise((resolve, reject) => {  
+    socket.on('connect', () => {
+      socket.emit('messages');
+      resolve({socket});
+    });
+
+    socket.on('connect_error', (err) => {
+      console.log('connect failed :-(');
+      reject(new Error('ws:connect_failed '))
+    });    
+  }).catch(
+    error =>({socket, error})
+  )
+ }

function* flow() {
  while (true) {
    let { payload } = yield take(`${roomEnrollmentRequest}`);
+    const {socket, error} = yield call(connect, {nickname: payload.nickname, room: payload.room});
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
      emit(onMessageReceived(message));
    });
    socket.on('messages', (messageList) => {
      emit(onMessageListReceived(messageList));
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

- Le'ts add this saga to the flow we are implementing (plus an error control).

_./src/sagas/index.js_

```diff
function* flow() {
  while (true) {
    let { payload } = yield take(actionIds.ENROLL_ROOM_REQUEST);
    const socket = yield call(connect, {nickname: payload.nickname, room: payload.room});
+    if(error) {      
+      // TODO Fire action to notify error on connection
+      console.log('flow: connection failed');    
+    } else {
+      const task = yield fork(handleIO, socket);      
+    }
  }
}
```

- Now that we have both sagas reading and writing, what are we missing? wait for the disconnect action.

_./src/sagas/index.js_

```diff
function* flow() {
  while (true) {
    let { payload } = yield take(actionIds.ENROLL_ROOM_REQUEST);        
    const {socket, error} = yield call(connect, {nickname: payload.nickname, room: payload.room});

    if(error) {      
      // TODO Fire action to notify error on connection
      console.log('flow: connection failed');    
    } else {
      const task = yield fork(handleIO, socket);
+      const action = yield take(actionIds.DISCONNECT);      
    }
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
+  enrollRoom : PropTypes.func,
};

const ChatContainerReact = ChatContainerInner;

const mapStateToProps = (state) => ({
  sessionInfo: state.sessionInfoReducer,
})

const mapDispatchToProps = (dispatch) => ({
+  enrollRoom: (nickname, room) => dispatch(EnrollRoomRequest(nickname, room)),
});

export const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatContainerReact);
```

- Now it's time to replace the chat inner component method _enrollRoom_ with the action that the chat saga is waitin for
to connect the socket.

_./src/pages/chat/chat.container.jsx_

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
+    this.props.enrollRoom(this.props.sessionInfo.nickname, this.props.sessionInfo.room);
  }

  disconnectfromRoom = () => {
    this.socket.disconnect();
  }
```

- Time to do a quick check, if we start the app and open redux devtool we can check that initial message list
is sent to the chatlog reducer.

```bash
npm start
```

- Let's keep on replacing chatlog component logic with the one we have with actions and sagas.

Time to read the chat log from the reducer.

Let's start with the redux container and expose the property down.

```diff
ChatContainerInner.propTypes = {
  sessionInfo: PropTypes.object,
+  chatLog: PropTypes.array,  
};

const ChatContainerReact = ChatContainerInner;

const mapStateToProps = (state) => ({
  sessionInfo: state.sessionInfoReducer,
+  chatLog: state.chatLogReducer,
})

const mapDispatchToProps = (dispatch) => ({
  enrollRoomRequest: (nickname, room) => dispatch(EnrollRoomRequest(nickname, room)),
});
```

- Let's update the component:

_./src/pages/chat/chat.container.jsx_

```diff
  render() {
    const { sessionInfo } = this.props;
    return (
      <React.Fragment>
        <ChatComponent 
          sessionInfo={sessionInfo} 
          enrollRoom={this.enrollRoom}
          disconnectFromRoom={this.disconnectfromRoom}
          currentMessage={this.state.currentMessage}
          onFieldChange={this.onFieldChange}
          onSendMessage={this.onSendMessage}
-          chatLog={this.state.chatLog}
+ -        chatLog={this.props.chatLog}
        />
      </React.Fragment>
    );
  }
}
```

- Let's simplify _messageFactory_ helper we will ad non currified version of the function.

_./src/api/chat.js_

```diff
- export const messageFactory = (channel, user) => (text) => ({
-  channel,
-  user,
-  text,
- })

+ export const messageFactory = (nickname, room, text) => ({
+  channel: room,
+  user: nickname,
+  text
+})
```

- Let's give more power to the _sendMessage_ action (it will help us simplify the component):

_./src/actions/index.js_

```diff
import { push } from 'connected-react-router';
import { actionIds } from '../common';
import { canEnrollRoom } from '../api/rooms';
+ import { messageFactory } from '../api/chat';

//...

export const sendMessage = (nickame, room, text) => ({
  type: actionIds.SEND_MESSAGE, 
-   payload: message,  
+   payload: messageFactory(nickname, room, text),
});
```

> We could write this action create as a function with several lines of code and a return statement.


Next step is to replace the send message logic with the one stored in the action / saga.

Let's first work with the redux container and react container props.

_./src/pages/chat/chat.container.jsx_

```diff
- import { EnrollRoomRequest } from '../../actions';
+ import { EnrollRoomRequest, sendMessage } from '../../actions';

// ... 

ChatContainerInner.propTypes = {
  sessionInfo: PropTypes.object,
  enrollRoomRequest : PropTypes.func,
+  sendMessage : PropTypes.func,
  chatLog: PropTypes.array,    
};

const ChatContainerReact = ChatContainerInner;

const mapStateToProps = (state) => ({
  sessionInfo: state.sessionInfoReducer,
  chatLog: state.chatLogReducer,  
})

const mapDispatchToProps = (dispatch) => ({
  enrollRoomRequest: (nickname, room) => dispatch(EnrollRoomRequest(nickname, room)),
+  sendMessage: (nickname, room, message) => dispatch(sendMessage(nickname, room, message)),   
});
```

And let's replace the component code:

_./src/pages/chat/chat.container.jsx_

```diff
  onSendMessage = () => {   
+    if(this.state.currentMessage) {
+       this.props.sendMessage(this.props.sessionInfo.nickname, this.props.sessionInfo.room, this.state.currentMessage);
+    }
-    if(this.state.currentMessage && this.messageFactory) {
-      const message = this.messageFactory(this.state.currentMessage)
-      this.socket.emit('message', message); 
-      this.setState({currentMessage: ''});
-    }
  }
```
- Let's give a quick try and check that sendMessage is working.

```bash
npm start
```

- Time to handle disconnection using actions.

First let's import the proper action.

```diff
+ import { EnrollRoomRequest, sendMessage, disconnectRoomRequest } from '../../actions';
// ...

ChatContainerInner.propTypes = {
  sessionInfo: PropTypes.object,
  enrollRoom : PropTypes.func,
  sendMessage : PropTypes.func,
  chatLog: PropTypes.array,  
+ disconnect : PropTypes.func,  
};

const ChatContainerReact = ChatContainerInner;

const mapStateToProps = (state) => ({
  sessionInfo: state.sessionInfoReducer,
  chatLog: state.chatLogReducer,
})

const mapDispatchToProps = (dispatch) => ({
  enrollRoom: (nickname, room) => dispatch(EnrollRoomRequest(nickname, room)),
  sendMessage: (nickname, room, message) => dispatch(sendMessage(nickname, room, message)),
+ disconnect: () => dispatch(disconnectRoomRequest()),
});

```

Let's jump into the component code and replace disconnection with this action:

```diff
disconnectfromRoom = () => {  
-  this.socket.disconnect();
   this.props.disconnect();
}
```

- Now that we have ported all the socket managements to actions/sagas, it's time to perform some cleanup in our 
componente code.

```diff
export class ChatContainerInner extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentMessage: '',
-      chatLog: [],
    };
-    this.socket = null;
-    this.messageFactory = null;
  }

  enrollRoom = () => {
    this.props.enrollRoom(this.props.sessionInfo.nickname, this.props.sessionInfo.room);
  }

  disconnectfromRoom = () => {
    this.props.disconnect();
  }

-  setupSocketListeners(socket) {
-    socket.on('connect', () => {
-      console.log(socket.id);
-      socket.emit('messages');
-    });
-    socket.on('error', (err) => console.log(err));
-    socket.on('disconnect', () => console.log('disconnected'))
-
-    socket.on('message', (msg) => {
-      console.log(msg);
-      this.setState({
-        chatLog: [...this.state.chatLog, mapApiSingleMessageToViewmodel(msg)],
-      });
-    });
-    socket.on('messages', (msgs) => {
-      const mappedMessages = mapApiMessagesToViewmodel(msgs);
-      this.setState({
-        chatLog: this.state.chatLog.concat(mappedMessages),
-      });
-    });
-  }

  onFieldChange = (id) => (value) => {
    this.setState({ [id]: value })
  }

  onSendMessage = () => {
    if (this.state.currentMessage) {
      this.props.sendMessage(this.props.sessionInfo.nickname, this.props.sessionInfo.room, this.state.currentMessage);
    }
  }

  render() {
    const { sessionInfo } = this.props;
    return (
      <React.Fragment>
        <ChatComponent
          sessionInfo={sessionInfo}
          enrollRoom={this.enrollRoom}
          disconnectFromRoom={this.disconnectfromRoom}
          currentMessage={this.state.currentMessage}
          onFieldChange={this.onFieldChange}
          onSendMessage={this.onSendMessage}
          chatLog={this.props.chatLog}
        />
      </React.Fragment>
    );
  }
}
```

There is still from improvement, as an excercise, some tips:
  - Disconnect function, you can directly call the props.disconnect in the component markup.
  - Convert component to stateless:
    - Include in the redux cycle the field change (remove the need to store in state current message).
    - Convert this component into stateless.

  






