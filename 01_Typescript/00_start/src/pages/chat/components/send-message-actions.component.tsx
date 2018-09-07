import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './send-message-actions.styles';

interface SendMessageActionsProps extends WithStyles<typeof styles> {
  currentMessage: string;
  onCurrentMessageChange: (msg: string) => void;
  onSendMessage: () => void;
};

const SendMessageActionsInner: React.StatelessComponent<SendMessageActionsProps> = (props) =>
  <React.Fragment>
    <TextField
      className={props.classes.textInput}
      InputProps={{
        className: props.classes.textInputInner,
      }}
      id="currentMessage"
      placeholder="Enter your message"
      value={props.currentMessage}
      onChange={onTextFieldChange(props.onCurrentMessageChange)}
      onKeyPress={handleInputKeyPress(props.currentMessage, props.onSendMessage)}
      margin="normal"
      autoFocus
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

const onTextFieldChange = (callback) => (e: React.ChangeEvent<HTMLInputElement>) => {
  callback(e.target.value);
}

const handleInputKeyPress = (msg: string, callback) => (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (msg && e && e.key === 'Enter') {
    callback();
  }
}

export const SendMessageActions = withStyles(styles)<SendMessageActionsProps>(SendMessageActionsInner);
