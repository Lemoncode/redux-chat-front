import React from 'react';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  container: {

  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 1rem 0.25rem',
    textAlign: 'end',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  cardTitleIcon: {
    width: '3rem',
    height: '3rem',
    marginRight: '0.5rem',
  },
});

const LobbyHeaderComponentInner = (props) =>
  <div className={props.classes.container}>
    <Typography
      className={props.classes.cardTitle}
      variant="display3"
    >
      <HomeIcon className={props.classes.cardTitleIcon}/>
      Lobby
    </Typography>
  </div>

export const LobbyHeaderComponent = withStyles(styles)(LobbyHeaderComponentInner);
