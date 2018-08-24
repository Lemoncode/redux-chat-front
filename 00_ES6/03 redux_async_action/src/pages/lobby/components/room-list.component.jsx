import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


export const RoomListComponent = (props) =>
  <List>
    {props.rooms.map((room) =>
      <ListItem button key={room}  onClick={onListItemClick(props, room)}>
        <ListItemText
          primary={room}
        />
      </ListItem>,
    )}
  </List>

const onListItemClick = (props, room) => (e) => props.onFieldChange('selectedRoom')(room);

RoomListComponent.propTypes = {
  rooms: PropTypes.array.isRequired,
  onFieldChange : PropTypes.func.isRequired
};
