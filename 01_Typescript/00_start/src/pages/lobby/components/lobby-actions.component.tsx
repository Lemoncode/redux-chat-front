import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './lobby-actions.styles';


interface LobbyActionsProps extends WithStyles<typeof styles> {
  nickname: string;
  selectedRoom: string;
  onNicknameChange: React.ChangeEventHandler<HTMLInputElement>;
  onJoinRoomRequest: () => void;
};

const LobbyActionsComponentInner: React.StatelessComponent<LobbyActionsProps> = (props) =>
  <React.Fragment>
    <TextField
      className={props.classes.nicknameInput}
      id="name"
      label="Enter your nickname"
      value={props.nickname}
      onChange={props.onNicknameChange}
      onKeyPress={handleInputKeyPress(props.nickname, props.selectedRoom,
        props.onJoinRoomRequest)}
      margin="dense"
    />
    <Button
      className={props.classes.joinButton}
      variant="contained" 
      size="large" 
      color="secondary"
      onClick={props.onJoinRoomRequest}
      disabled={!enrollFieldsInformed(props.nickname, props.selectedRoom)}
    >
      Join
    </Button>
  </React.Fragment>

const enrollFieldsInformed = (nickname: string, selectedRoom: string) =>
  (!!(nickname && selectedRoom));

const handleInputKeyPress = (nickname: string, selectedRoom: string, callback) => (event) => {
  const enrollOk = enrollFieldsInformed(nickname, selectedRoom);
  if (enrollOk && event && event.key === 'Enter') {
    callback();
  }
} 

export const LobbyActionsComponent =
  withStyles(styles)<LobbyActionsProps>(LobbyActionsComponentInner);
