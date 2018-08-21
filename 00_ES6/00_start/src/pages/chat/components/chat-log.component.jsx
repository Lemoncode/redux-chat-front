import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  messageContainer: {
    maxWidth: '75%',
    padding: '0.25rem 2rem 0.25rem 0.75rem',
    margin: '0.25rem 0',
    borderRadius: '5px',
    backgroundColor: theme.palette.grey['100'],
  },
  highlight: {
    alignSelf: 'flex-end',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
  },
  messageUser: {
    color: 'inherit',
  },
  messageText: {
    color: 'inherit',
  }
});

const ChatLogComponentInner = (props) => {
  const getMessageStyle = (username) =>
    `${props.classes.messageContainer} ${/*props.nickname*/'Chiquito' === username ?
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
