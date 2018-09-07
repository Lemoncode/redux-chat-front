import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './lobby-header.styles';


interface LobbyHeaderProps extends WithStyles<typeof styles> {
}

const LobbyHeaderComponentInner: React.StatelessComponent<LobbyHeaderProps> = (props) =>
  <div className={props.classes.container}>
    <Typography
      className={props.classes.title}
      variant="display3"
    >
      <HomeIcon className={props.classes.icon}/>
      Lobby
    </Typography>
  </div>

export const LobbyHeaderComponent = withStyles(styles)<LobbyHeaderProps>(LobbyHeaderComponentInner);
