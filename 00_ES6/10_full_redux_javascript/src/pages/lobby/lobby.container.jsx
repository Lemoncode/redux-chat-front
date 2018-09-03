import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { canEnrollRequest, updateCandidateRoom, updateCandidateNickname, updateRoomList } from '../../actions';
import { candidateNicknameSelector, candidateRoomSelector, roomsSelector } from '../../selectors';
import { LobbyComponent } from './lobby.component';


class LobbyContainerInner extends React.Component {
  constructor(props) {
    super(props);
  }

  handleJoinRoomRequest = () => {
    this.props.fireSessionEnrollRequest(this.props.nickname, this.props.selectedRoom);
  }

  render() {
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

LobbyContainerInner.propTypes = {
  rooms: PropTypes.array.isRequired,
  updateRooms: PropTypes.func.isRequired,
  selectedRoom: PropTypes.string.isRequired,
  updateSelectedRoom: PropTypes.func.isRequired,
  nickname: PropTypes.string.isRequired,
  updateNickname: PropTypes.func.isRequired,
  fireSessionEnrollRequest: PropTypes.func.isRequired,
};

const LobbyContainerRect = withRouter(
  LobbyContainerInner
);

const mapStateToProps = (state) => ({
  rooms: roomsSelector(state),
  selectedRoom: candidateRoomSelector(state),
  nickname: candidateNicknameSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  updateRooms: () => dispatch(updateRoomList()),
  updateSelectedRoom: (room) => dispatch(updateCandidateRoom(room)),
  updateNickname: (nickname) => dispatch(updateCandidateNickname(nickname)),
  fireSessionEnrollRequest: (nickname, room) => dispatch(canEnrollRequest(nickname, room)),
});

export const LobbyContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LobbyContainerRect);
