import * as React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { SetupPageRoute, SetupPage } from './pages/setup-page';
import { ChatPageRoute } from './pages/chat-page';
import { routePaths } from './common/routes';

const HomeRoute = () => <Route exact={true} path={routePaths.home} component={SetupPage} />;

export const AppRouter = () => (
  <Router>
    <Switch>
      {HomeRoute()}
      {SetupPageRoute()}
      {ChatPageRoute()}
    </Switch>
  </Router>
);
