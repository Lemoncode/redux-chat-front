import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import styles from './room-list.styles';


const RoomListComponentInner = (props) =>
  <List>
    {props.rooms.map((room) => {
      const isRoomSelected = Boolean(room === props.selectedRoom);
      return (
        <ListItem button key={room} onClick={onListItemClick(props, room)}>
          <Avatar
            className={isRoomSelected ? props.classes.selectedAvatar : undefined}
          >
            <ChatIcon />
          </Avatar>
          <ListItemText
            primary={room}
            primaryTypographyProps={{
              color: isRoomSelected ? 'secondary' : 'default',
              variant: isRoomSelected ? 'title' : 'subheading',
            }}
          />
        </ListItem>
      );
    })}
  </List>

const onListItemClick = (props, room) => (e) =>
  props.onFieldChange('selectedRoom')(room);

RoomListComponentInner.propTypes = {
  rooms: PropTypes.array.isRequired,
  selectedRoom: PropTypes.string.isRequired,
  onFieldChange : PropTypes.func.isRequired
};

export const RoomListComponent = withStyles(styles)(RoomListComponentInner);