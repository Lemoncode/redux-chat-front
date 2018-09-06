import * as React from 'react';
import { connect } from 'react-redux';
import {
  disconnectRoomRequest,
  enrollRoomRequest,
  sendMessage,
  updateSearchTerm,
  updateCurrentMessage
} from './actions';
import { sessionInfoSelector } from '../../core';
import {
  filteredChatLogSelector,
  searchTermSelector,
  currentMessageSelector,
} from './selectors';
import { mapSessionInfoFromStoreToViewmodel, mapSessionInfoFromViewmodelToApi } from './mappers';
import { ChatComponent } from './components';
import * as ViewModel from './viewmodel';

interface ChatContainerProps {
  sessionInfo: ViewModel.SessionInfo,
  enrollRoom: (sessionInfo: ViewModel.SessionInfo) => void;
  sendMessage: (nickname: string, room: string, message: string) => void;
  disconnect: () => void;
  chatLog: ViewModel.ChatLog;
  currentMessage: string;
  updateCurrentMessage: (currentMessage: string) => void;
  searchTerm: string;
  updateSearchTerm: (searchTerm: string) => void;
};

export class ChatContainerInner extends React.Component<ChatContainerProps> {
  private enrollRoom = () => {
    this.props.enrollRoom(this.props.sessionInfo);
  }

  private onSendMessage = () => {
    if (this.props.currentMessage) {
      this.props.sendMessage(
        this.props.sessionInfo.nickname,
        this.props.sessionInfo.room,
        this.props.currentMessage
      );
      this.props.updateCurrentMessage('');
    }
  }

  public render() {
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

// TODO: Typings.
const mapStateToProps = (state) => ({
  sessionInfo: mapSessionInfoFromStoreToViewmodel(sessionInfoSelector(state)),
  chatLog: filteredChatLogSelector(state),
  currentMessage: currentMessageSelector(state),
  searchTerm: searchTermSelector(state),
});

// TODO: Typings.
const mapDispatchToProps = (dispatch) => ({
  enrollRoom: (sessionInfo: ViewModel.SessionInfo) => dispatch(enrollRoomRequest(mapSessionInfoFromViewmodelToApi(sessionInfo))),
  sendMessage: (nickname: string, room: string, message: string) => dispatch(sendMessage(nickname, room, message)),
  disconnect: () => dispatch(disconnectRoomRequest()),
  updateCurrentMessage: (currentMessage: string) => dispatch(updateCurrentMessage(currentMessage)),
  updateSearchTerm: (searchTerm: string) => dispatch(updateSearchTerm(searchTerm)),
});

export const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatContainerInner);

