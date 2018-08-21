import React from 'react';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 1rem 0.25rem',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    width: '3rem',
    height: '3rem',
    marginRight: '0.5rem',
  },
});

const LobbyHeaderComponentInner = (props) =>
  <div className={props.classes.container}>
    <Typography
      className={props.classes.title}
      variant="display3"
    >
      <HomeIcon className={props.classes.icon}/>
      Lobby
    </Typography>
  </div>

export const LobbyHeaderComponent = withStyles(styles)(LobbyHeaderComponentInner);
