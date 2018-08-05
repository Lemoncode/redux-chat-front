import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class ChatComponent extends React.Component {
  componentWillMount() {
  }

  onChangeTextField = (fieldId) => (e) => {
    this.props.onFieldChange(fieldId)(e.target.value);
  }

  render() {
    return (
      <div>
        <Typography variant="display4" gutterBottom>
          Chat Room
        </Typography>

        <TextField
          id="currentMessage"
          label="Enter your message"
          value={this.props.currentMessage}
          onChange={this.onChangeTextField('currentMessage')}
          margin="normal"
        />
      </div>
    )
  }
}

ChatComponent.propTypes = {
  onFieldChange : PropTypes.func.isRequired,
  messageHistory : PropTypes.string.isRequired,
  currentMessage : PropTypes.string.isRequired,
  nickName : PropTypes.string.isRequired,
};