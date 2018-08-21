import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import UserIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.primary.main,
  },
  homeButton: {
    margin: '0 0.5rem',
  },
  homeIcon: {
    width: '2rem',
    height: '2rem',
    color: theme.palette.primary.contrastText,
  },
  roomTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.25rem 1rem 0.5rem',
    color: theme.palette.primary.contrastText,    
  },
  roomIcon: {
    width: '2rem',
    height: '2rem',
    marginRight: '0.5rem',
  },
  userTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 1rem',
    color: theme.palette.primary.contrastText,
  },
  userIcon: {
    marginRight: '0.5rem',
  },
});

const ChatHeaderComponentInner = (props) =>
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

ChatHeaderComponentInner.propTypes = {
  nickname : PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
};

export const ChatHeaderComponent = withStyles(styles)(ChatHeaderComponentInner);
