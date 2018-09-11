import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ChatContainer, LobbyContainer } from './pages';
import { history } from './common';
import { store } from './store';


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact={true} path="/" component={LobbyContainer} />
        <Route path="/chat" component={ChatContainer} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
