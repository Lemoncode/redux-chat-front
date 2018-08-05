import React from 'react';
import { getListOfRooms } from '../../api/rooms';
import { LobbyComponent } from './lobby.component';

export class LobbyContainer extends React.Component {
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

  render() {
    return (
      <LobbyComponent 
        rooms={this.state.rooms} 
        fetchRooms={this.fetchRooms}
        nickname={this.state.nickname}
        onFieldChange={this.onFieldChange}
        selectedRoom={this.state.selectedRoom}
        />
    );
  }
}

