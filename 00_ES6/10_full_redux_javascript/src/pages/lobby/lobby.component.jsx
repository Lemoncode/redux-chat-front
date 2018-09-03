import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { CardLayout } from '../../common';
import {
  LobbyActionsComponent,
  LobbyHeaderComponent,
  RoomListComponent
} from './components';
import styles from './lobby.styles';


class LobbyComponentInner extends React.Component {
  componentDidMount() {
    this.props.updateRooms();
  }

  handleNicknameChange = (e) => {
    this.props.updateNickname(e.target.value);
  }

  handleSelectedRoomChange = (room) => {
    this.props.updateSelectedRoom(room);
  }

  render() {
    return (
      <CardLayout>
        <Card className={this.props.classes.card}>
          <LobbyHeaderComponent />
          <CardContent className={this.props.classes.cardContent}>
            <Typography variant="subheading">
              Select Room:
            </Typography>
            <RoomListComponent
              rooms={this.props.rooms}
              selectedRoom={this.props.selectedRoom}
              onSelectedRoomChange={this.handleSelectedRoomChange}
            />
          </CardContent>
          <CardActions className={this.props.classes.cardActions}>
            <LobbyActionsComponent
              nickname={this.props.nickname}
              selectedRoom={this.props.selectedRoom}
              onJoinRoomRequest={this.props.onJoinRoomRequest}
              onNicknameChange={this.handleNicknameChange}
            />
          </CardActions>
        </Card>
      </CardLayout>
    )
  }
}

LobbyComponentInner.propTypes = {
  rooms: PropTypes.array.isRequired,
  updateRooms: PropTypes.func.isRequired,
  selectedRoom: PropTypes.string.isRequired,
  updateSelectedRoom: PropTypes.func.isRequired,
  nickname: PropTypes.string.isRequired,
  updateNickname: PropTypes.func.isRequired,
  onJoinRoomRequest: PropTypes.func.isRequired
};

export const LobbyComponent = withStyles(styles)(LobbyComponentInner);
