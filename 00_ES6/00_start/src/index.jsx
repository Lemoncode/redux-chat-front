import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import {LobbyContainer, ChatContainer} from './pages'

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact={true} path="/" component={LobbyContainer} />
      <Route path="/chat" component={ChatContainer} />
    </Switch>
  </HashRouter>
  ,
  document.getElementById('root')
);