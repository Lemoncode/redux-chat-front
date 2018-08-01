import * as React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { ChatId } from '../../../../common/components/chat-id';
import * as mock from '../../mock-data';

interface ChatFooterProps {
}

export class ChatFooter extends React.PureComponent<ChatFooterProps, {}> {

  public render() {
    return (
      <Toolbar>
        Footer
      </Toolbar>
    );
  }
}
