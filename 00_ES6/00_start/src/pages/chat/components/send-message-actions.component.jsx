import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
  textInput: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 0,
    padding: '0.5rem',
    backgroundColor: theme.palette.common.white,
    borderRadius: '5px',
  },
  textInputInner: {
    '&::after, &::before': {
      display: 'none',
    }
  },
  sendButton: {
    marginLeft: '1.5rem',
  },
  sendIcon: {
    fontSize: '2rem',
    marginLeft: '4px',
  },
});


const SendMessageActionsInner = (props) =>
  <React.Fragment>
    <TextField
      className={props.classes.textInput}
      InputProps={{
        className: props.classes.textInputInner,
      }}
      id="currentMessage"
      placeholder="Enter your message"
      value={props.currentMessage}
      onChange={onChangeTextField('currentMessage', props.onFieldChange)}
      onKeyPress={handleInputKeyPress(props.currentMessage, props.onSendMessage)}
      margin="normal"
    />
    <Button
      className={props.classes.sendButton}
      variant="fab"
      color="secondary"
      onClick={props.onSendMessage}
      disabled={!props.currentMessage}
    >
      <SendIcon className={props.classes.sendIcon}/>
    </Button>
  </React.Fragment>

const onChangeTextField = (fieldId, onFieldChange) => (e) => {
  onFieldChange(fieldId)(e.target.value);
}

const handleInputKeyPress = (message, callback) => (event) => {
  if (message && event && event.key === 'Enter') {
    callback();
  }
}

SendMessageActionsInner.propTypes = {
  currentMessage: PropTypes.string.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
};

export const SendMessageActions = withStyles(styles)(SendMessageActionsInner);