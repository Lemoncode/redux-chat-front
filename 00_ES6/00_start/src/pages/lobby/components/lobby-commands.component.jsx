import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export const LobbyCommandsComponent = (props) =>
  <React.Fragment>
    <Typography variant="body2" gutterBottom>
      Selected room: {props.selectedRoom.name}
    </Typography>
    <Button variant="contained" size="large" color="primary">
      Join
    </Button>
  </React.Fragment>

LobbyCommandsComponent.propTypes = {
  selectedRoom: PropTypes.object,
};

