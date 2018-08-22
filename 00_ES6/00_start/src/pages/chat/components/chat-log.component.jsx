import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from './chat-log.styles';


const ChatLogComponentInner = (props) => {
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

ChatLogComponentInner.propTypes = {
  nickname: PropTypes.string.isRequired,
  chatLog: PropTypes.array.isRequired,
};

export const ChatLogComponent = withStyles(styles)(ChatLogComponentInner);
