import * as React from 'react';
import { Route } from 'react-router-dom';
import { ChatPage } from './chat-page.component';
import { routePaths } from '../../common/routes';

export const ChatPageRoute = () => (
  <Route
    path={routePaths.chat}
    component={ChatPage}
  />
);
