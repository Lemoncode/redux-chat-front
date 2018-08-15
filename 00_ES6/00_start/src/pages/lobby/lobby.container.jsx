import React from 'react';
import { withRouter } from 'react-router-dom'
import { getListOfRooms } from '../../api/rooms';
import { LobbyComponent } from './lobby.component';

class LobbyContainerInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rooms: [], nickname: '', selectedRoom: {id: 0, name:''}};

    this.fetchRooms = this.fetchRooms.bind(this);
  }

  async fetchRooms() {
    const rooms = await getListOfRooms();
    this.setState({rooms});
  }

  onFieldChange = (id) => (value) => {
    this.setState({[id]: value})
  }

  onJoinRoomRequest = () => {
    console.log(`*** Join Room Request 
                 Nickname: ${this.state.nickname}
                 Room: ${this.state.selectedRoom.name}`);
    this.props.history.push('/chat');
  }

  render() {
    return (
      <LobbyComponent 
        rooms={this.state.rooms} 
        fetchRooms={this.fetchRooms}
        nickname={this.state.nickname}
        onFieldChange={this.onFieldChange}
        selectedRoom={this.state.selectedRoom}
        onJoinRoomRequest={this.onJoinRoomRequest}
        />
    );
  }
}

export const LobbyContainer = withRouter(LobbyContainerInner);
