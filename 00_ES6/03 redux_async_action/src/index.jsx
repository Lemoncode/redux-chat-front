import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { store } from './store';
import {LobbyContainer, ChatContainer} from './pages';
import {history} from './history.js';

ReactDOM.render(
 <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact={true} path="/" component={LobbyContainer} />
          <Route path="/chat" component={ChatContainer} />
        </Switch>
        </ConnectedRouter>
 </Provider>  
  ,
  document.getElementById('root')
);