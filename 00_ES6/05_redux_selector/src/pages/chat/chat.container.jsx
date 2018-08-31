import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { enrollRoomRequest, sendMessage, disconnectRoomRequest, updateSearchTerm } from '../../actions';
import { ChatComponent } from './chat.component';
import {
  establishRoomSocketConnection,
  mapApiSingleMessageToViewmodel,
  mapApiMessagesToViewmodel,
} from './chat.container.business'
import { filteredChatLogSelector } from "../../selectors";

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

  onChangeSearchTerm = (newSearchTerm) => {
    this.props.updateSearchTerm(newSearchTerm);
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
          searchTerm={this.props.searchTerm}
          onChangeSearchTerm={this.onChangeSearchTerm}
        />
      </React.Fragment>
    );
  }
}

ChatContainerInner.propTypes = {
  sessionInfo: PropTypes.object,
  enrollRoom : PropTypes.func,  
  chatLog: PropTypes.array,  
  sendMessage : PropTypes.func,
  disconnect : PropTypes.func,  
};

//const ChatContainerReact = ChatContainerInner;

import { createSelector } from 'reselect';

const mapStateToProps = (state) => ({
  sessionInfo: state.sessionInfoReducer,
  chatLog: filteredChatLogSelector(state),
  searchTerm: state.searchReducer.searchTerm,
});

const mapDispatchToProps = (dispatch) => ({
  enrollRoom: (nickname, room) => dispatch(enrollRoomRequest(nickname, room)),
  sendMessage: (nickname, room, message) => dispatch(sendMessage(nickname, room, message)),
  disconnect: () => dispatch(disconnectRoomRequest()),
  updateSearchTerm: (searchTerm) => dispatch(updateSearchTerm(searchTerm)),
});

export const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatContainerInner);

