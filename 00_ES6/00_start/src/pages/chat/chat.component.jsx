import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

export class ChatComponent extends React.Component {
  componentWillMount() {
    this.props.enrollRoom();
  }

  componentWillUnmount() {
    this.props.disconnectFromRoom();
  }

  render() {
    return (
      <div>
        <Typography variant="display4" gutterBottom>
          Chat
        </Typography>
        <h1>Hello from chat page</h1>
        <p>nickname: {this.props.sessionInfo.nickname}</p>
        <p>room: {this.props.sessionInfo.room}</p>
        <Link to="/">Navigate back to lobby</Link>
      </div>
    )
  }
}

ChatComponent.propTypes = {
  sessionInfo: PropTypes.object,
  enrollRoom: PropTypes.func,
  disconnectFromRoom : PropTypes.func,
};