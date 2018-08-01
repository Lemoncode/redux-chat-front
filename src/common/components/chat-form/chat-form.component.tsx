import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { Card } from '@material-ui/core';

export class ChatForm extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <Card>
        <Typography variant="display1">My ChatForm</Typography>
      </Card>
    );
  }
}
