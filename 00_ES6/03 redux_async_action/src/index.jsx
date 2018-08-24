import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { store } from './store';
import { ChatContainer, LobbyContainer } from './pages';
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