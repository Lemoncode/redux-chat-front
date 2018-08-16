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
        <ChatComponent sessionInfo={sessionInfo}/>        
      </React.Fragment>
    );
  }
}

ChatContainerInner.propTypes = {
  sessionInfo: PropTypes.object,
  setChatSessionInfo: PropTypes.func.isRequired,
};

export const ChatContainer = withSessionContext(ChatContainerInner);
