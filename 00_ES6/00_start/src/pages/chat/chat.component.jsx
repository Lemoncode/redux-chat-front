import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        <Typography variant="display4" gutterBottom>
          Chat
        </Typography>
        <h1>Hello from chat page</h1>
        <p>nickname: {this.props.sessionInfo.nickname}</p>
        <p>room: {this.props.sessionInfo.room}</p>

        <TextField
          id="currentMessage"
          label="Enter your message"
          value={this.props.currentMessage}
          onChange={this.onChangeTextField('currentMessage')}
          margin="normal"
        />
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={this.props.onSendMessage}
          disabled={!this.props.currentMessage}
        >
          Join
    </Button>

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
};