import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { CardLayout } from '../../common';
import styles from './chat.styles';
import {
  ChatAutoscrollComponent,
  ChatHeaderComponent,
  ChatLogComponent,
  ChatSearch,
  SendMessageActions
} from './components';
import { SessionInfo, ChatLog } from './chat.viewmodel';


interface ChatProps extends WithStyles<typeof styles> {
  sessionInfo: SessionInfo,
  enrollRoom: () => void;
  disconnectFromRoom: () => void;
  onSendMessage: () => void;
  chatLog: ChatLog;
  currentMessage: string;
  onCurrentMessageChange: (msg: string) => void;
  searchTerm: string;
  onSearchTermChange: (searchTerm: string) => void;
};

class ChatComponentInner extends React.PureComponent<ChatProps> {
  public componentWillMount() {
    this.props.enrollRoom();
  }

  public componentWillUnmount() {
    this.props.disconnectFromRoom();
  }

  public render() {
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

export const ChatComponent = withStyles(styles)<ChatProps>(ChatComponentInner);
