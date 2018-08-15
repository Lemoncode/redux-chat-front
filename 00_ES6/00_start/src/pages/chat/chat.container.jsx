import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withSessionContext } from '../../common';

const ChatContainerInner = (props) =>
  <React.Fragment>
    <h1>Hello from chat page</h1>
    <p>nickname: {props.sessionInfo.nickname}</p>
    <p>room: {props.sessionInfo.room}</p>
    <Link to="/">Navigate back to lobby</Link>
  </React.Fragment>

ChatContainerInner.propTypes = {
  sessionInfo : PropTypes.object,
  setChatSessionInfo : PropTypes.func.isRequired,
};

export const ChatContainer = withSessionContext(ChatContainerInner);
