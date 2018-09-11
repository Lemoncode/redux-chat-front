import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './chat-log.styles';
import * as ViewModel from '../viewmodel';


interface ChatLogProps extends WithStyles<typeof styles> {
  nickname: string;
  chatLog: ViewModel.ChatLog;
};

const ChatLogComponentInner: React.StatelessComponent<ChatLogProps> = (props) => {
  const getMessageStyle = (username) =>
    `${props.classes.messageContainer} ${props.nickname === username ?
      props.classes.highlight : undefined}`

  return (
    <div className={props.classes.container}>
      {
        props.chatLog.map((msg, index) => (
          <div key={index} className={getMessageStyle(msg.user)}>
            <Typography
              className={props.classes.messageUser}
              variant="body2"
            >
              {msg.user}
            </Typography>
            <Typography
              className={props.classes.messageText}
              variant="subheading"
            >
              {msg.text}
            </Typography>
          </div>
        ))
      }
    </div>
  );
}

export const ChatLogComponent = withStyles(styles)<ChatLogProps>(ChatLogComponentInner);
