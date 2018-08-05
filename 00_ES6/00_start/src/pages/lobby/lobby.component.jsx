import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

        <List>
          {this.props.rooms.map((room) =>
            <ListItem  button key={room.id} onClick={(e) => this.props.onFieldChange('selectedRoom')(room)}>
              <ListItemText
                primary={room.name}
              />
            </ListItem>,
          )}
        </List>

        <Typography variant="body2" gutterBottom>
          Selected room: {this.props.selectedRoom.name}
        </Typography>
        <Button variant="contained" size="large" color="primary">
          Join
        </Button>        
      </div>
    )
  }
}

LobbyComponent.propTypes = {
  nickname: PropTypes.string.isRequired,
  rooms: PropTypes.array.isRequired,
  selectedRoom: PropTypes.object.isRequired,
  fetchRooms: PropTypes.func.isRequired,
  onFieldChange : PropTypes.func.isRequired
};