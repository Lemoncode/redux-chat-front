import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './chat-autoscroll.styles';


class ChatAutoscrollComponentInner extends React.PureComponent {
  containerRef = null;
  setContainerRef = (ref) => this.containerRef = ref;
  
  componentDidUpdate() {
    if (this.containerRef) {
      this.containerRef.scrollTop = this.containerRef.scrollHeight;
    }
  }

  render() {
    return (
      <div
        ref={this.setContainerRef}      
        className={this.props.classes.container}
      >
        {this.props.children}
      </div>
  )}
};

export const ChatAutoscrollComponent = withStyles(styles)(ChatAutoscrollComponentInner);
