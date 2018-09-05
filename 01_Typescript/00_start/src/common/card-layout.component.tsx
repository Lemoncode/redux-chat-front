import * as React from 'react';
import { withStyles } from "@material-ui/core/styles";
import styles from './card-layout.styles';

const CardLayoutInner = (props) => (
  <div className={props.classes.container}>
    {props.children}
  </div>
);

export const CardLayout = withStyles(styles)(CardLayoutInner);