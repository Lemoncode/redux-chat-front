import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import { CardLayout } from '../../common';
import styles from './chat.styles';
import {
  ChatAutoscrollComponent,
  ChatHeaderComponent,
  ChatLogComponent,
  ChatSearch,
  SendMessageActions
} from './components';


class ChatComponentInner extends React.Component {
  componentWillMount() {
    this.props.enrollRoom();
  }

  componentWillUnmount() {
    this.props.disconnectFromRoom();
  }

  render() {
    return (
      <CardLayout>
        <Card className={this.props.classes.card}>
          <ChatHeaderComponent
            nickname={this.props.sessionInfo.nickname}
            room={this.props.sessionInfo.room}
          />
          <ChatSearch
            searchTerm={this.props.searchTerm}
            onSearchTermChange={this.props.onSearchTermChange}
          />
          <CardContent
            component={ChatAutoscrollComponent}
            className={this.props.classes.cardContent}
          >
            <ChatLogComponent 
              nickname={this.props.sessionInfo.nickname}
              chatLog={this.props.chatLog}
            />
          </CardContent>
          <CardActions className={this.props.classes.cardActions}>
            <SendMessageActions
              currentMessage={this.props.currentMessage}
              onCurrentMessageChange={this.props.onCurrentMessageChange}
              onSendMessage={this.props.onSendMessage}
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
  onSendMessage: PropTypes.func.isRequired,
  chatLog: PropTypes.array.isRequired,
  currentMessage: PropTypes.string.isRequired,
  onCurrentMessageChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearchTermChange: PropTypes.func.isRequired,
};

export const ChatComponent = withStyles(styles)(ChatComponentInner)