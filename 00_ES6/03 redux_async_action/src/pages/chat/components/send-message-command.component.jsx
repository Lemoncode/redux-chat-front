import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const SendMessageCommand = (props) =>
  <React.Fragment>
    <TextField
      id="currentMessage"
      label="Enter your message"
      value={props.currentMessage}
      onChange={onChangeTextField('currentMessage', props.onFieldChange)}
      margin="normal"
    />
    <Button
      variant="contained"
      size="large"
      color="primary"
      onClick={props.onSendMessage}
      disabled={!props.currentMessage}
    >
      Send
    </Button>
  </React.Fragment>

const onChangeTextField = (fieldId, onFieldChange) => (e) => {
  onFieldChange(fieldId)(e.target.value);
}


SendMessageCommand.propTypes = {
  currentMessage: PropTypes.string.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
};
