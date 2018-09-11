import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './chat-autoscroll.styles';

interface ChatAutoscrollProps extends WithStyles<typeof styles> {
}

class ChatAutoscrollComponentInner extends React.PureComponent<ChatAutoscrollProps> {
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

export const ChatAutoscrollComponent = withStyles(styles)<ChatAutoscrollProps>(ChatAutoscrollComponentInner);
