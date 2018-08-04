import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class LobbyComponent extends React.Component {
  componentWillMount() {
    this.props.fetchRooms();
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.props.rooms.map(
              (room) => <li key={room.id}>{room.name}</li>
            )
          }
        </ul>
      </div>
    )
  }
}

LobbyComponent.propTypes = {
  rooms: PropTypes.array.isRequired,
  fetchRooms: PropTypes.func.isRequired
};