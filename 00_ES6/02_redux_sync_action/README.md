# Example

In this sample we will replace the React context that is storing the session, and use the session info reducer.

We will create an action to store the session info in the reducer, and connect it in the chat page.

> The goal of this sample is to learn about redux and actions, storing this info, may be just included 
in the privder state instead of redux.

# steps

- This example takes as starting point example _01 redux-infraestrcuture_, just copy the content from that folder and execute _npm install_.

- Before continue since we are going to make use of the spread operator and we are not using Babel 7 we need to make some config.

First install babel-plugin-transform-object-rest-spread

```bash
npm install babel-plugin-transform-object-rest-spread --save-dev
```

Then update the .babelrc config

_./.babelrc_

```diff
{
  "presets": [
    "env",
    "react"
  ],
  "plugins": [
-    "transform-class-properties"
+    "transform-class-properties",
+    "transform-object-rest-spread"
  ]
}
```

- We are going to setup an action, this actions needs to have an ID, let's create a place to define this action ID's list:

_./src/common/actionIds.js_

```javascript
export const actionIds = {
  SETUP_SESSION_INFO: '[1] Store nickname and room name.',
}
```

- Time to update the associated _index.js_ file.

_./src/common/index.js_

```diff
export * from './sessionProvider';
+ export * from './actionIds';
```

- Now let's create the action that will be triggered whenever the user can enroll into the channel.

_./src/actions/index.js_

```javascript
import { actionIds } from '../common';

export const storeSessionInfo = (nickname, room) => ({
  type: actionIds.SETUP_SESSION_INFO,
  payload: {nickname, room}
})
```

- We have already created a reducer that contains session info, let's handle the session info 
update.

_./src/reducers/session-info.js_

```diff
+ import { actionIds } from '../common';

const defaultState = () => ({
  nickname: '',
  channel: '',
});

export const sessionInfoReducer = (state = defaultState(), action) => {
+  switch(action.type) {
+    case actionIds.SETUP_SESSION_INFO:
+      return handleUpdateSessionInfo(state, action.payload);
+  }

  return state;
}

+ export const handleUpdateSessionInfo = (state, {nickname, room}) => ({
+   ...state,
+   nickname,
+   room,
+ })
```

- Now is time to move to the UI side, we will create a redux container that will wrap
our current React container (here we could go gradually replacing the React container
until we remove it at all, but that's something optional).

- First step let's rename our _LobbyContainer_ to _LobbyContainerReact_ and remove the export

_./src/pages/lobby/lobby.container.js_

```diff
- export const LobbyContainer = withSessionContext(withRouter(
+ const LobbyContainerReact = withSessionContext(withRouter(  
  LobbyContainerInner
));
```

- Let's import now _connect_ from _react-redux_ (this will allow us create the redux container and connect it to
our react component), and let's import the action that we have previously created

_./src/pages/lobby/lobby.container.js_

```diff
import React from 'react';
import PropTypes from 'prop-types';
+ import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withSessionContext } from '../../common';
import { getListOfRooms, canEnrollRoom } from '../../api/rooms';
+ import {storeSessionInfo} from '../../actions';
import { LobbyComponent } from './lobby.component';
```

- Let's create a _LobbyContainer_ ,at the bottom of the file, that will wrap our _LobbyContainerReact_ 

_./src/pages/lobby/lobby.container.js_

```diff
+  const mapStateToProps = (state) => ({
+  })
+
+  const mapDispatchToProps = (dispatch) => ({
+    setChatSessionInfo: (nickname, room) => dispatch(storeSessionInfo(nickname, room)),
+  });
+ export const LobbyContainer = connect(
+  mapStateToProps,
+  mapDispatchToProps,
+ )(LobbyContainerReact);
```

- Let's remove the _withSessionContext_  wrapper from the _LobbyContainerReact_

_./src/pages/lobby/lobby.container.js_

```diff
- export const LobbyContainerReact = withSessionContext(withRouter(
+ export const LobbyContainerReact = withRouter(
  LobbyContainerInner
- ));
+ );
```

- Let's give a quick try (chat page won't work properly, but let's ensure nothing is broken, open redux-dev-tools):

```bash
npm start
```

- It's time update our chat container to indicate that we are going to get the session info from 
redux instead of the context.

- Let's rename _ChatContainer_ to _ChatContainerReact_, remove the export and the _withSessionContext_.

_./src/pages/chat/chat.container.js_

```diff
- export const ChatContainer = withSessionContext(ChatContainerInner);
+ const ChatContainerReact = ChatContainerInner;
```

- Let's add the _import_ to reference _connect_ from _reactredux_

```diff
import React from 'react';
+ import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { messageFactory } from '../../api/chat'
```

- And create a redux based _ChatContainer_ (this time we will read the properties from the redux state
instead of the provider)

_./src/pages/chat/chat.container.js_

```diff
+  const mapStateToProps = (state) => ({
+    sessionInfo: state.sessionInfoReducer,
+  })
+
+  const mapDispatchToProps = (dispatch) => ({
+  });
+ export const LobbyContainer = connect(
+  mapStateToProps,
+  mapDispatchToProps,
+ )(ChatContainerReact);
```

- And we can remove the reference to the _sessionProvider_ in our _index.jsx_

_./src/index.jsx_

```diff
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
- import {SessionProvider} from './common';
import { store } from './store';
import {LobbyContainer, ChatContainer} from './pages';

ReactDOM.render(
 <Provider store={store}>
-    <SessionProvider>
      <HashRouter>
        <Switch>
          <Route exact={true} path="/" component={LobbyContainer} />
          <Route path="/chat" component={ChatContainer} />
        </Switch>
      </HashRouter>
-    </SessionProvider>
 </Provider>  
  ,
  document.getElementById('root')
);
```

- And remove the _sessionProvider.jsx_ file (_./src/common/sessionProvider.js_).

- And the import reference:

_./common/index.js_

```diff
- export * from './sessionProvider';
export * from './actionIds';
```

- Let's run the sample and check that everything is working again.

```bash
npm start
```



