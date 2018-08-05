import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

export class LobbyComponent extends React.Component {
  componentWillMount() {
    this.props.fetchRooms();
  }

  onChangeTextField = (fieldId) => (e) => {
    this.props.nicknameChange(fieldId)(e.target.value);
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

        <List>
          {this.props.rooms.map((room) =>
            <ListItem key={room.id}>
              <ListItemText
                primary={room.name}
              />
            </ListItem>,
          )}
        </List>

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
  nickname: PropTypes.string.isRequired,
  rooms: PropTypes.array.isRequired,
  fetchRooms: PropTypes.func.isRequired,
  nicknameChange : PropTypes.func.isRequired
};