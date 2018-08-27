# Example

In this sample we will manage asynchronous actions, we will make use redux-thunk helper.

# Steps

- Redux actions are meant to be resolved synchronously, What happens if I need to resolve something like an AJAX call (async nature)?
a popular and simple solution is to make use of Redux Thunk Middleware, a micro library (14 lines of code).

- Let's start by installing this library.

```bash
npm install redux-thunk --save
```

- Now let's add redux-thunk to our store setup.

_./src/store.js_

```diff
- import { createStore } from 'redux';
+ import { createStore, applyMiddleware } from 'redux';
import { reducers } from './reducers';
+ import ReduxThunk from 'redux-thunk';

// Add redux dev tool support
export const store = createStore(reducers, 
                          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
+                          applyMiddleware(ReduxThunk)
                         ); 
```

- Now it's time to create our action, if we take a look to the lobby container we will extract part of the code (the async
canEnroll), later on we will complete it with the navigation.

> About the action creator we are coding: it's a currified function, redux thunk takes care of injecting the dispatcher
(first we get any param the action itself may recieve, then we get the dispatcher) once the action is donde we can
perform this dispatch.

_./src/actions/index.js_

```diff
import { actionIds } from '../common';
+ import { canEnrollRoom } from '../api/rooms';

export const storeSessionInfo = (nickname, room) => ({
  type: actionIds.SETUP_SESSION_INFO,
  payload: {nickname, room}
})

+ export const canEnrollRequest = (nickname, room) => (dispatch) => {
+  canEnrollRoom(room, nickname).then((succeeded) => {
+    if(succeeded === true) {
+      console.log(`*** Join Room Request succeeded
+      Nickname: ${nickname}
+      Room: ${room}`);
+      dispatch(storeSessionInfo(nickname, room));
+
+    } else {
+      // We could leverage this to the reducer
+      console.log(`Join room request failed try another nickname`);
+    }
+  });
+  // For the sake of the sample no Error handling, we could add it here
+ }
```

> About using async/await on thunks: https://stackoverflow.com/questions/41930443/how-to-async-await-redux-thunk-actions

> What we are doing, just handle the response and in case of sucess fire the SETUP_SESSION_INFO that we have already created.

TODO: it would be a good idea to handle the result of the canEnroll call and store that result in the reducer (final user could
get some feedback), another option could be to display a toast from the action itself.

- Moving to the _lobby.container.jsx_ let's import the new action creator we have created under actions.

_./src/pages/lobby/lobby.container.jsx_

```diff 
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getListOfRooms, canEnrollRoom } from '../../api/rooms';
- import { canEnrollRequest } from '../../actions';
+ import { canEnrollRequest } from '../../actions';
import { LobbyComponent } from './lobby.component';
```

- Now let's add this property to the contract of the lobby component, and remove setChatSessionInfo.

_./src/pages/lobby/lobby.container.jsx_

```diff
LobbyContainerInner.propTypes = {
  sessionInfo: PropTypes.object,
-   setChatSessionInfo: PropTypes.func.isRequired,
+   fireSessionEnrollRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
```

- Let's add this action to the container mapDispatchToProps section mapping.

_./src/pages/lobby/lobby.container.jsx_

```diff
const mapDispatchToProps = (dispatch) => ({
-   setChatSessionInfo: (nickname, room) => dispatch(storeSessionInfo(nickname, room)),
+   fireSessionEnrollRequest: (nickname, room) => dispatch(canEnrollRequest(nickname, room)), 
});

```

- Let's remove the former method used the container.

_./src/pages/lobby/lobby.container.jsx_

```diff
  async fetchRooms() {
    const rooms = await getListOfRooms();
    this.setState({ rooms });
  }

-  async joinRoomRequest() {
-    const canEnroll = await canEnrollRoom(this.state.selectedRoom, this.state.nickname);

-    if (canEnroll) {
-      console.log(`*** Join Room Request succeeded
-      Nickname: ${this.state.nickname}
-      Room: ${this.state.selectedRoom}`);
-
-      this.props.setChatSessionInfo(this.state.nickname, this.state.selectedRoom);
-      this.props.history.push('/chat');
-    } else {
-      console.log(`Join room request failed try another nickname`);
-    }
-  }

  onFieldChange = (id) => (value) => {
    this.setState({ [id]: value })
  }

  onJoinRoomRequest = () => {
-    this.joinRoomRequest();
+    this.props.fireSessionEnrollRequest(this.state.nickname, this.state.selectedRoom);
  }
```

- Time to give a quick try and check that is working fine using dev tools.

```
npm start
```

- So far so good, BUT how can we navigate to a different page when the enrollment has succeeded? Is time to connect React
Router with the Redux architecture.

- Let's install _connected-react-router_ library (https://github.com/supasate/connected-react-router):

```
npm install connected-react-router --save
```

> This library creates a reducer for the browser history and enables us to access history on actions.

- First we will sotre the router history in a separate object, let's 
install the _history_ library.

```bash
npm install history --save
```

- Let's create an own history object.

_./src/history.js_

```javascript
import { createHashHistory } from 'history';

export const history = createHashHistory();
```

- Let's configure the store so the rootReducer is wrapped by _connectRouter_.

_./src/store.js_

```diff
- import { createStore, applyMiddleware } from 'redux';
+ import { createStore, applyMiddleware, compose } from 'redux';
+ import { routerMiddleware, connectRouter } from 'connected-react-router';
import { reducers } from './reducers';
import ReduxThunk from 'redux-thunk';
+ import {history} from './history';

// Add redux dev tool support
- export const store = createStore(reducers, 
-                          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
-                          applyMiddleware(ReduxThunk)
-                         );  

+ const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
+
+ const store = createStore(
+  connectRouter(history)(reducers),
+  composeEnhancer(
+    applyMiddleware(
+      routerMiddleware(history),
+      ReduxThunk
+    ),
+  ),
+) 
```

- Let's wrap react-router V4 with _ConnectedRouter_ and pass the history as a prop.

_./src/index.jsx_

```diff
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
+ import { ConnectedRouter } from 'connected-react-router';
import { store } from './store';
import {LobbyContainer, ChatContainer} from './pages';
+ import {history} from './history.js';

ReactDOM.render(
 <Provider store={store}>
+  <ConnectedRouter history={history}>
-      <HashRouter>
        <Switch>
          <Route exact={true} path="/" component={LobbyContainer} />
          <Route path="/chat" component={ChatContainer} />
        </Switch>
-      </HashRouter>
+   </ConnectedRouter>
 </Provider>  
  ,
  document.getElementById('root')
);
```

- Let's do a quick check, start the project, open dev tools and check
that we got a router reducer.

- Now in the action that we have defined we can directly launch the navigation.

_./src/actions/index.js_

```diff
+ import { push } from 'connected-react-router';
import { actionIds } from '../common';
import { canEnrollRoom } from '../api/rooms';

export const storeSessionInfo = (nickname, room) => ({
  type: actionIds.SETUP_SESSION_INFO,
  payload: { nickname, room }
})

export const canEnrollRequest = (nickname, room) => (dispatch) => {
  canEnrollRoom(room, nickname).then((succeeded) => {
    if (succeeded === true) {
      console.log(`*** Join Room Request succeeded
      Nickname: ${nickname}
      Room: ${room}`);
      dispatch(storeSessionInfo(nickname, room));
+      dispatch(push('/chat'));

    } else {
      // We could leverage this to the reducer
      console.log(`Join room request failed try another nickname`);
    }
  });
  // For the sake of the sample no Error handling, we could add it here
}
```

- Let's run the project and we can check that we are firing a navigation 
action from the action, and on the other hand the time machine in dev
tools get synchronized.

```bash
npm start
```

> Now comes a tough decisition, if we build the whole app based on actions
and reducers we will get a powerful time machine with all the info needed
to replay any bug, on the other hand, going that way makes the application
too verbose, too much code sometimes for small features.

