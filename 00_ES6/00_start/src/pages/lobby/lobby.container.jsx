import React from 'react';
import { getListOfRooms } from '../../api/rooms';
import { LobbyComponent } from './lobby.component';

export class LobbyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rooms: []};
  }

  async fetchRooms() {
    const rooms = await getListOfRooms();
    this.setState({rooms});
  }

  render() {
    return (
      <LobbyComponent/>
    );
  }
}

