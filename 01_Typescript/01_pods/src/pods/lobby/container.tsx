import * as React from 'react';
import { connect } from 'react-redux';
import {
  canEnrollRequest,
  updateCandidateRoom,
  updateCandidateNickname,
  updateRoomList
} from './actions';
import {
  candidateNicknameSelector,
  candidateRoomSelector,
  roomsSelector
} from './selectors';
import { LobbyComponent } from './components';


interface LobbyContainerProps {
  rooms: string[],
  updateRooms: () => void,
  selectedRoom: string,
  updateSelectedRoom: (room: string) => void,
  nickname: string,
  updateNickname: (nickname: string) => void,
  fireSessionEnrollRequest: (nickname: string, room: string) => void,
}

class LobbyContainerInner extends React.Component<LobbyContainerProps> {
  private handleJoinRoomRequest = () => {
    this.props.fireSessionEnrollRequest(this.props.nickname, this.props.selectedRoom);
  }

  public render() {
    return (
      <LobbyComponent
        rooms={this.props.rooms}
        updateRooms={this.props.updateRooms}
        selectedRoom={this.props.selectedRoom}
        updateSelectedRoom={this.props.updateSelectedRoom}
        nickname={this.props.nickname}
        updateNickname={this.props.updateNickname}
        onJoinRoomRequest={this.handleJoinRoomRequest}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  rooms: roomsSelector(state),
  selectedRoom: candidateRoomSelector(state),
  nickname: candidateNicknameSelector(state),
})

// TODO: Typings.
const mapDispatchToProps = (dispatch) => ({
  updateRooms: () => dispatch(updateRoomList()),
  updateSelectedRoom: (room) => dispatch(updateCandidateRoom(room)),
  updateNickname: (nickname) => dispatch(updateCandidateNickname(nickname)),
  fireSessionEnrollRequest: (nickname, room) => dispatch(canEnrollRequest(nickname, room)),
});

export const LobbyContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LobbyContainerInner);
