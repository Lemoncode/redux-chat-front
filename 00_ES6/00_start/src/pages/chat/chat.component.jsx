import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { SessionInfoComponent, SendMessageActions, ChatHeaderComponent } from './components';
import { CardLayout } from '../../common';

const styles = (theme) => ({
  card: {
    width: '100%',
  },
  cardContent: {
    marginTop: '1rem',
  },
  cardActions: {
    padding: '1rem 1.5rem',
    backgroundColor: `${theme.palette.primary.light}4a`,
  }
});


class ChatComponentInner extends React.Component {
  componentWillMount() {
    this.props.enrollRoom();
  }

  componentWillUnmount() {
    this.props.disconnectFromRoom();
  }

  onChangeTextField = (fieldId) => (e) => {
    this.props.onFieldChange(fieldId)(e.target.value);
  }

  render() {
    return (
      <CardLayout>
        <Card className={this.props.classes.card}>
          <ChatHeaderComponent
            nickname={this.props.sessionInfo.nickname}
            room={this.props.sessionInfo.room}
          />
          <CardContent className={this.props.classes.cardContent}>
            <TextField
              id="chatlog"
              value={this.props.chatLog}
              multiline={true}
              rows={5}
              fullWidth={true}
              margin="normal"
            />
          </CardContent>
          <CardActions className={this.props.classes.cardActions}>
            <SendMessageActions
              currentMessage={this.props.currentMessage}
              onSendMessage={this.props.onSendMessage}
              onFieldChange={this.props.onFieldChange}
            />
          </CardActions>
        </Card>
      </CardLayout>
    )
  }
}

ChatComponentInner.propTypes = {
  sessionInfo: PropTypes.object.isRequired,
  enrollRoom: PropTypes.func.isRequired,
  disconnectFromRoom: PropTypes.func.isRequired,
  currentMessage: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  chatLog: PropTypes.string.isRequired,
};

export const ChatComponent = withStyles(styles)(ChatComponentInner)