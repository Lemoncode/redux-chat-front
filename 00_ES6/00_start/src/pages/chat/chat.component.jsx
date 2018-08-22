import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { withStyles } from '@material-ui/core/styles';
import { SendMessageActions, ChatHeaderComponent, ChatLogComponent } from './components';
import { CardLayout } from '../../common';
import styles from './chat.styles';


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
            <ChatLogComponent 
              nickname={this.props.sessionInfo.nickname}
              chatLog={this.props.chatLog}
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
  chatLog: PropTypes.array.isRequired,
};

export const ChatComponent = withStyles(styles)(ChatComponentInner)