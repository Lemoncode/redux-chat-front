import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { LobbyActionsComponent } from './lobby-actions.component';
import { LobbyHeaderComponent } from './lobby-header.component';
import { RoomListComponent } from './room-list.component';
import styles from './lobby.styles';


interface LobbyProps extends WithStyles<typeof styles>{
  rooms: string[],
  updateRooms: () => void,
  selectedRoom: string,
  updateSelectedRoom: (room: string) => void,
  nickname: string,
  updateNickname: (nickname: string) => void,
  onJoinRoomRequest: () => void,
}

class LobbyComponentInner extends React.Component<LobbyProps> {
  public componentDidMount() {
    this.props.updateRooms();
  }

  private handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateNickname(e.target.value);
  }

  private handleSelectedRoomChange = (room: string) => {
    this.props.updateSelectedRoom(room);
  }

  public render() {
    return (
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
    )
  }
}

export const LobbyComponent = withStyles(styles)<LobbyProps>(LobbyComponentInner);
