import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  disconnectRoomRequest,
  enrollRoomRequest,
  sendMessage,
  updateSearchTerm,
  updateCurrentMessage
} from '../../actions';
import { filteredChatLogSelector, searchTermSelector, currentMessageSelector } from "../../selectors";
import { ChatComponent } from './chat.component';

export class ChatContainerInner extends React.Component {
  constructor(props) {
    super(props);
  }

  enrollRoom = () => {
    this.props.enrollRoom(this.props.sessionInfo.nickname, this.props.sessionInfo.room);
  }

  onSendMessage = () => {
    if (this.props.currentMessage) {
      this.props.sendMessage(
        this.props.sessionInfo.nickname,
        this.props.sessionInfo.room,
        this.props.currentMessage
      );
      this.props.updateCurrentMessage('');
    }
  }

  render() {
    const { sessionInfo } = this.props;
    return (
      <React.Fragment>
        <ChatComponent
          sessionInfo={sessionInfo}
          enrollRoom={this.enrollRoom}
          disconnectFromRoom={this.props.disconnect}
          chatLog={this.props.chatLog}
          onSendMessage={this.onSendMessage}
          currentMessage={this.props.currentMessage}
          onCurrentMessageChange={this.props.updateCurrentMessage}
          searchTerm={this.props.searchTerm}
          onSearchTermChange={this.props.updateSearchTerm}
        />
      </React.Fragment>
    );
  }
}

ChatContainerInner.propTypes = {
  sessionInfo: PropTypes.object.isRequired,
  enrollRoom : PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  disconnect: PropTypes.func.isRequired,
  chatLog: PropTypes.array.isRequired,
  currentMessage: PropTypes.string.isRequired,
  updateCurrentMessage: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  updateSearchTerm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sessionInfo: state.sessionInfoReducer,
  chatLog: filteredChatLogSelector(state),
  currentMessage: currentMessageSelector(state),
  searchTerm: searchTermSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  enrollRoom: (nickname, room) => dispatch(enrollRoomRequest(nickname, room)),
  sendMessage: (nickname, room, message) => dispatch(sendMessage(nickname, room, message)),
  disconnect: () => dispatch(disconnectRoomRequest()),
  updateCurrentMessage: (currentMessage) => dispatch(updateCurrentMessage(currentMessage)),
  updateSearchTerm: (searchTerm) => dispatch(updateSearchTerm(searchTerm)),
});

export const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatContainerInner);

