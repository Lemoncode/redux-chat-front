import * as React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { routePaths } from '../../common/routes';

export const SetupPage = () => (
  <>
    <Typography variant="display1">Setup Page</Typography>
    <Link to={routePaths.chat}>
      <Button>Chat</Button>
    </Link>
  </>
);
