import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import {ChatComponent} from './chat.component';

class ChatContainerInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nickname: '', messageHistory: '', currentMessage: '' };
  }

  onFieldChange = (id) => (value) => {
    this.setState({ [id]: value })
  }

  render() {
    return (
      <ChatComponent
        nickname={this.state.nickname}
        messageHistory={this.state.messageHistory}
        currentMessage={this.state.currentMessage}
        onFieldChange={this.onFieldChange}
      />
    );
  }
}

export const ChatContainer = withRouter(ChatContainerInner);

ChatContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  })
}

