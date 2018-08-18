# Example

In thi sample we will setup the basic plumbing to get redux up and running in our project.

# Steps

- This example takes as starting point example _00 start_, just copy the content from that folder and execute _npm install_

- In this sample we will start using _redux-dev-tool- plugin you can download it as a Chrome plugin.

- We need to install the _Redux_ package plus the official React bindings for Redux.

```bash
npm install redux react-redux --save-dev
```

- Let's create our first reducer, it will hold the session informatin: _nickname_ and _channel_ chosen.

_./src/reducers/session-info.js_

```javascript
const defaultState = () => ({
  nickname: '',
  channel: '',
});

export const sessionInfoReducer = (state = defaultState(), action) => {
  return state;
}
```

- Let's unify all the reducers by using combineReducers (later on more reducers will be created)

> We can nest several calls of combineRedcuers

_./src/reducers/index.js_

```javascript
import { combineReducers } from 'redux';
import { sessionInfoReducer } from './session-info';

export const reducers = combineReducers({
  sessionInfoReducer,
});
```

- Now that we have the reducers we we need to place them in the application single store, let's setup as well 
redux-dev-tool support

_./src/store.js_ 

```javascript
import { createStore } from 'redux';
import { reducers } from './reducers';

// Add redux dev tool support
export const store = createStore(reducers, 
                          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                         );  
```

- Let's register in our application entry point:

_./src/index.jsx_

```diff
import React from 'react';
import ReactDOM from 'react-dom';
+ import {Provider} from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import {SessionProvider} from './common';
+ import { store } from './store';
import {LobbyContainer, ChatContainer} from './pages';

ReactDOM.render(
+ <Provider store={store}>
    <SessionProvider>
      <HashRouter>
        <Switch>
          <Route exact={true} path="/" component={LobbyContainer} />
          <Route path="/chat" component={ChatContainer} />
        </Switch>
      </HashRouter>
    </SessionProvider>
+ </Provider>  
  ,
  document.getElementById('root')
);
```

- Now it's time to open redux dev tool and check that our store + reducer is displayed.

```bash
npm start
```



