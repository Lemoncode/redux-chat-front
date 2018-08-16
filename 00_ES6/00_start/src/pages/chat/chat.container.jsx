import React from 'react';
import PropTypes from 'prop-types';
import { messageFactory } from '../../api/chat'
import { withSessionContext } from '../../common';
import { ChatComponent } from './chat.component';
import {establishRoomSocketConnection, messagesToString} from './chat.container.business'


export class ChatContainerInner extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {currentMessage: '', chatLog: ''};    
    this.socket = null;
    this.messageFactory = null;
  }
  
  enrollRoom = () => {
    this.socket = establishRoomSocketConnection(this.props.sessionInfo.nickname, this.props.sessionInfo.room);
    this.messageFactory = messageFactory(this.props.sessionInfo.room, this.props.sessionInfo.nickname);
    this.setupSocketListeners(this.socket);
  }

  disconnectfromRoom = () => {
    this.socket.disconnect();
  }

  setupSocketListeners(socket) {
    socket.on('connect', () => {
      console.log(socket.id);
      socket.emit('messages');
    });
    socket.on('error', (err) => console.log(err));
    socket.on('disconnect', () => console.log('disconnected'))

    socket.on('message', (msg) => {
      this.setState({chatLog: `${this.state.chatLog}${msg.user}: ${msg.text}\n`});
      console.log(msg);
    });
    socket.on('messages', (msgs) => {
      let messages = messagesToString(msgs);

      this.setState({chatLog: `${this.state.chatLog}${messages}`});      
    });
  }

  onFieldChange = (id) => (value) => {
    this.setState({ [id]: value })
  }

  onSendMessage = () => {    
    if(this.state.currentMessage && this.messageFactory) {
        const message = this.messageFactory(this.state.currentMessage)
        this.socket.emit('message', message);    
    }
  }

  render() {
    const { sessionInfo } = this.props;
    return (
      <React.Fragment>
        <ChatComponent 
          sessionInfo={sessionInfo} 
          enrollRoom={this.enrollRoom}
          disconnectFromRoom={this.disconnectfromRoom}
          currentMessage={this.state.currentMessage}
          onFieldChange={this.onFieldChange}
          onSendMessage={this.onSendMessage}
          chatLog={this.state.chatLog}
        />
      </React.Fragment>
    );
  }
}

ChatContainerInner.propTypes = {
  sessionInfo: PropTypes.object,
  setChatSessionInfo: PropTypes.func.isRequired,    
};

export const ChatContainer = withSessionContext(ChatContainerInner);
