import * as React from 'react';
import { Route } from 'react-router-dom';
import { SetupPage } from './setup-page.component';
import { routePaths } from '../../common/routes';

export const SetupPageRoute = () => (
  <Route
    path={routePaths.setup}
    component={SetupPage}
  />
);
