import React from 'react';
import PropTypes from 'prop-types';
import { createSocket, messageFactory } from '../../api/chat'
import { withSessionContext } from '../../common';
import { ChatComponent } from './chat.component';

// Check what to do with this member variable (no rerender on update)

export class ChatContainerInner extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {currentMessage: '', chatLog: ''};
    this.socket = null;
  }
  
  enrollRoom = () => {
    // TODO: move this to env variable
    const baseUrl = 'http://localhost:3000';

    const socketParams = {
      url: baseUrl,
      channel: this.props.sessionInfo.room,
      options: {
        query: `user=${this.props.sessionInfo.nickname}`
      },
    };

    this.socket = createSocket(socketParams);
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
      let messages = '';
      // NOTE: Timestamp it's created on server not used on client yet.
      console.log('messages', msgs);
      msgs.map((ms) => ({
        user: ms.userId,
        text: ms.text
      })).forEach((mc) => {
        messages += `${mc.user}: ${mc.text}\n`;        
        console.log(mc);        
      });

      this.setState({chatLog: `${this.state.chatLog}${messages}`});      
    });
  }

  onFieldChange = (id) => (value) => {
    this.setState({ [id]: value })
  }

  onSendMessage = () => {    
    if(this.state.currentMessage) 
    {
      // TODO: move to member variable like, rename or refactor this
      // maybe currified function? 
      const msgFactory = messageFactory(this.props.sessionInfo.room, this.props.sessionInfo.nickname);
      const message = msgFactory.compose(this.state.currentMessage)
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
