import * as React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import UserIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './chat-header.styles';


interface ChatHeaderProps extends WithStyles<typeof styles> {
  nickname: string;
  room: string;
};

const ChatHeaderComponentInner: React.StatelessComponent<ChatHeaderProps> = (props) =>
  <div className={props.classes.container}>
    <Link to="/">
      <IconButton className={props.classes.homeButton}>
        <HomeIcon className={props.classes.homeIcon}/>
      </IconButton>
    </Link>
    <Typography
      className={props.classes.roomTitle}
      variant="display2"
    >
      <ChatIcon className={props.classes.roomIcon}/>
      {props.room}
    </Typography>
    <Typography
      className={props.classes.userTitle}
      variant="subheading"
    >
      <UserIcon className={props.classes.userIcon}/>
      {props.nickname}
    </Typography>
  </div>


export const ChatHeaderComponent = withStyles(styles)<ChatHeaderProps>(ChatHeaderComponentInner);
