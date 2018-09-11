import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { SessionProvider } from './common';
import { ChatContainer, LobbyContainer } from './pages';

ReactDOM.render(
  <SessionProvider>
    <HashRouter>
      <Switch>
        <Route exact={true} path="/" component={LobbyContainer} />
        <Route path="/chat" component={ChatContainer} />
      </Switch>
    </HashRouter>
  </SessionProvider>
  ,
  document.getElementById('root')
);
