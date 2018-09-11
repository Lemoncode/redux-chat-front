import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ChatIcon from '@material-ui/icons/Chat';
import styles from './room-list.styles';


interface RoomListProps extends WithStyles<typeof styles> {
  rooms: string[];
  selectedRoom: string;
  onSelectedRoomChange: (room: string) => void;
}

const RoomListComponentInner: React.StatelessComponent<RoomListProps> = (props) =>
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

const onListItemClick = (props: RoomListProps, room: string) => (e) =>
  props.onSelectedRoomChange(room);

export const RoomListComponent = withStyles(styles)<RoomListProps>(RoomListComponentInner);