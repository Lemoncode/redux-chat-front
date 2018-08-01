import * as React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { AppRouter } from './app.router';
import { lemonTheme } from './common/styles';

export const App = () => (
  <MuiThemeProvider theme={lemonTheme}>
    <AppRouter />
  </MuiThemeProvider>
);
