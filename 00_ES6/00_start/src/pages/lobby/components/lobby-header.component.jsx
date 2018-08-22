import React from 'react';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';
import styles from './lobby-header.styles';


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
