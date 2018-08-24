import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { SessionProvider } from './common';
import { store } from './store';
import { ChatContainer, LobbyContainer } from './pages';

ReactDOM.render(
 <Provider store={store}>
    <SessionProvider>
      <HashRouter>
        <Switch>
          <Route exact={true} path="/" component={LobbyContainer} />
          <Route path="/chat" component={ChatContainer} />
        </Switch>
      </HashRouter>
    </SessionProvider>
 </Provider>  
  ,
  document.getElementById('root')
);