import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export const SessionInfoComponent = (props) =>
  <React.Fragment>
        <Typography variant="display4" gutterBottom>
          Chat
        </Typography>
        <h1>Hello from chat page</h1>
        <p>nickname: {props.nickname}</p>
        <p>room: {props.room}</p>
  </React.Fragment>

SessionInfoComponent.propTypes = {
  nickname: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,  
};
