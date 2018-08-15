import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SessionContext } from '../../common';

const ChatContainerInner = (props) =>
  <React.Fragment>
    <h1>Hello from chat page</h1>
    <p>nickname: {props.nickname}</p>
    <p>room: {props.room}</p>
    <Link to="/">Navigate back to lobby</Link>
  </React.Fragment>

ChatContainerInner.propTypes = {
  nickname : PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
};


export const ChatContainer = () =>
  <SessionContext.Consumer>
    {(sessionInfo) => <ChatContainerInner
      nickname={sessionInfo.nickname}
      room={sessionInfo.room}
    />}
  </SessionContext.Consumer>