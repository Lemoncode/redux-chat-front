import React from 'react';
import PropTypes from 'prop-types';
import { CardLayout } from '../../common';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { LobbyHeaderComponent, RoomListComponent, LobbyActionsComponent } from './components';

const styles = (theme) => ({
  card: {
    width: '75%',
    minWidth: '30rem',
  },
  cardContent: {
    marginTop: '1rem',
  },
  cardActions: {
    padding: '1rem 1.5rem',
  }
});


class LobbyComponentInner extends React.Component {
  componentWillMount() {
    this.props.fetchRooms();
  }

  onChangeTextField = (fieldId) => (e) => {
    this.props.onFieldChange(fieldId)(e.target.value);
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
              onFieldChange={this.props.onFieldChange}
            />
          </CardContent>
          <CardActions className={this.props.classes.cardActions}>
            <LobbyActionsComponent
              nickname={this.props.nickname}
              selectedRoom={this.props.selectedRoom}
              onJoinRoomRequest={this.props.onJoinRoomRequest}
              onNicknameChange={this.onChangeTextField('nickname')}
            />
          </CardActions>
        </Card>
      </CardLayout>
    )
  }
}

LobbyComponentInner.propTypes = {
  nickname: PropTypes.string.isRequired,
  rooms: PropTypes.array.isRequired,
  selectedRoom: PropTypes.string.isRequired,
  fetchRooms: PropTypes.func.isRequired,
  onFieldChange : PropTypes.func.isRequired,
  onJoinRoomRequest: PropTypes.func.isRequired
};

export const LobbyComponent = withStyles(styles)(LobbyComponentInner);