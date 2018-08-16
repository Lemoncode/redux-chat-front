import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import {SessionInfoComponent, SendMessageCommand} from './components';

export class ChatComponent extends React.Component {
  componentWillMount() {
    this.props.enrollRoom();
  }

  componentWillUnmount() {
    this.props.disconnectFromRoom();
  }

  onChangeTextField = (fieldId) => (e) => {
    this.props.onFieldChange(fieldId)(e.target.value);
  }

  render() {
    return (
      <div>
        <SessionInfoComponent
          nickname={this.props.sessionInfo.nickname}
          room={this.props.sessionInfo.room}
        />

        <TextField
          id="chatlog"
          value={this.props.chatLog}
          multiline={true}
          rows={5}
          fullWidth={true}
          margin="normal"
        />

        <br />

        <SendMessageCommand
          currentMessage={this.props.currentMessage}
          onSendMessage={this.props.onSendMessage}
          onFieldChange={this.props.onFieldChange}
        />

        <br />
        <Link to="/">Navigate back to lobby</Link>
      </div>
    )
  }
}

ChatComponent.propTypes = {
  sessionInfo: PropTypes.object.isRequired,
  enrollRoom: PropTypes.func.isRequired,
  disconnectFromRoom: PropTypes.func.isRequired,
  currentMessage: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  chatLog: PropTypes.string.isRequired,
};