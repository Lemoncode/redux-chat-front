import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withSessionContext } from '../../common';
import { ChatComponent} from './chat.component';

export class ChatContainerInner extends React.Component {
  render() {
    const { sessionInfo } = this.props;
    return (
      <React.Fragment>
        <h1>Hello from chat page</h1>
        <p>nickname: {sessionInfo.nickname}</p>
        <p>room: {sessionInfo.room}</p>
        <ChatComponent/>
        <Link to="/">Navigate back to lobby</Link>
      </React.Fragment>
    );
  }
}

ChatContainerInner.propTypes = {
  sessionInfo: PropTypes.object,
  setChatSessionInfo: PropTypes.func.isRequired,
};

export const ChatContainer = withSessionContext(ChatContainerInner);
