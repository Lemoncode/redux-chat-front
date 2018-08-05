import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {RoomListComponent, LobbyCommandsComponent} from './components'

export class LobbyComponent extends React.Component {
  componentWillMount() {
    this.props.fetchRooms();
  }

  onChangeTextField = (fieldId) => (e) => {
    this.props.onFieldChange(fieldId)(e.target.value);
  }

  render() {
    return (
      <div>
        <Typography variant="display4" gutterBottom>
          Lobby
        </Typography>

        <TextField
          id="name"
          label="Enter your nickname"
          value={this.props.nickname}
          onChange={this.onChangeTextField('nickname')}
          margin="normal"
        />
        <RoomListComponent
          rooms={this.props.rooms}
          onFieldChange={this.props.onFieldChange}
        />

        <LobbyCommandsComponent
          selectedRoom={this.props.selectedRoom}
          onJoinRoomRequest={this.props.onJoinRoomRequest}
        />
      </div>
    )
  }
}

LobbyComponent.propTypes = {
  nickname: PropTypes.string.isRequired,
  rooms: PropTypes.array.isRequired,
  selectedRoom: PropTypes.object.isRequired,
  fetchRooms: PropTypes.func.isRequired,
  onFieldChange : PropTypes.func.isRequired,
  onJoinRoomRequest: PropTypes.func.isRequired
};