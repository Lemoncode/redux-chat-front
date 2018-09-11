import * as React from 'react';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import styles from './card-layout.styles';

interface CardLayoutProps extends WithStyles<typeof styles> {
};

const CardLayoutInner: React.StatelessComponent<CardLayoutProps> = (props) => (
  <div className={props.classes.container}>
    {props.children}
  </div>
);

export const CardLayout = withStyles(styles)<CardLayoutProps>(CardLayoutInner);
