import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
  nicknameInput: {
    flex: 1,
    marginTop: 0,
  },
  joinButton: {
    marginLeft: '1.5rem',
  }
});

const LobbyActionsComponentInner = (props) =>
  <React.Fragment>
    <TextField
      className={props.classes.nicknameInput}
      id="name"
      label="Enter your nickname"
      value={props.nickname}
      onChange={props.onNicknameChange}
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

const enrollFieldsInformed = (nickname, selectedRoom) =>
  (!!(nickname && selectedRoom));
  
LobbyActionsComponentInner.propTypes = {
  nickname : PropTypes.string.isRequired,
  selectedRoom: PropTypes.string.isRequired,
  onNicknameChange: PropTypes.func.isRequired,
  onJoinRoomRequest: PropTypes.func.isRequired,
};

export const LobbyActionsComponent = withStyles(styles)(LobbyActionsComponentInner);
