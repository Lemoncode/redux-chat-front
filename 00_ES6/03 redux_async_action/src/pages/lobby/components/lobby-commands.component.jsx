import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export const LobbyCommandsComponent = (props) =>
  <React.Fragment>
    <Typography variant="body2" gutterBottom>
      Selected room: {props.selectedRoom}
    </Typography>
    <Button 
      variant="contained" 
      size="large" 
      color="primary"
      onClick={props.onJoinRoomRequest}
      disabled={!enrollFieldsInformed(props.nickname, props.selectedRoom)}
      >
      Join
    </Button>
  </React.Fragment>

const enrollFieldsInformed = (nickname, selectedRoom) =>
  (!!(nickname && selectedRoom));
  
LobbyCommandsComponent.propTypes = {
  nickname : PropTypes.string,
  selectedRoom: PropTypes.string,
  onJoinRoomRequest: PropTypes.func,
};

