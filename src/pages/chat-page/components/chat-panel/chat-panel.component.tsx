import * as React from 'react';
import * as styles from './chat-panel.styles';
import { withTheme, WithTheme } from '@material-ui/core';

interface ChatPanelProps {

}

class ChatPanelInner extends React.PureComponent<ChatPanelProps & WithTheme, {}> {
  public render() {
    return (
      <div className={styles.container(this.props.theme)}>
        Conversation here
      </div>
    );
  }
}

export const ChatPanel = withTheme()(ChatPanelInner);
