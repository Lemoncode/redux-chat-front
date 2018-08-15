import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export class ChatComponent extends React.Component {
  componentWillMount() {
  }

  render() {
    return (
      <div>
        <Typography variant="display4" gutterBottom>
          Chat
        </Typography>
      </div>
    )
  }
}

ChatComponent.propTypes = {
};