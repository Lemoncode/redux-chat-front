import React from 'react';
import PropTypes from 'prop-types';
import { messageFactory } from '../../api/chat'
import { connect } from 'react-redux';
import { EnrollRoomRequest, sendMessage, disconnectRoomRequest } from '../../actions';
import { ChatComponent } from './chat.component';
import {
  establishRoomSocketConnection,
  mapApiSingleMessageToViewmodel,
  mapApiMessagesToViewmodel
} from './chat.container.business'

export class ChatContainerInner extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentMessage: '',
    };
  }

  enrollRoom = () => {
    this.props.enrollRoom(this.props.sessionInfo.nickname, this.props.sessionInfo.room);
  }

  disconnectfromRoom = () => {
    this.props.disconnect();
  }

  onFieldChange = (id) => (value) => {
    this.setState({ [id]: value })
  }

  onSendMessage = () => {
    if (this.state.currentMessage) {
      this.props.sendMessage(this.props.sessionInfo.nickname, this.props.sessionInfo.room, this.state.currentMessage);
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
          chatLog={this.props.chatLog}
        />
      </React.Fragment>
    );
  }
}

ChatContainerInner.propTypes = {
  //  sessionInfo: PropTypes.object,
  //  enrollRoom : PropTypes.function,
  //  sendMessage : PropTypes.function,
  //  chatLog: PropTypes.array,  
  //  sendMessage : PropTypes.function,
  // disconnect : PropTypes.function,  
};

const ChatContainerReact = ChatContainerInner;

const mapStateToProps = (state) => ({
  sessionInfo: state.sessionInfoReducer,
  chatLog: state.chatLogReducer,
})

const mapDispatchToProps = (dispatch) => ({
  enrollRoom: (nickname, room) => dispatch(EnrollRoomRequest(nickname, room)),
  sendMessage: (nickname, room, message) => dispatch(sendMessage(nickname, room, message)),
  disconnect: () => dispatch(disconnectRoomRequest()),
});

export const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatContainerReact);

