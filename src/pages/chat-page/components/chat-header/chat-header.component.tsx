import * as React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { ChatId } from '../../../../common/components/chat-id';
import * as mock from '../../mock-data';

interface ChatHeaderProps {
}

export class ChatHeader extends React.PureComponent<ChatHeaderProps, {}> {

  public render() {
    return (
      <Toolbar>
        <ChatId image={mock.avatarImage} text={mock.avatarText}/>
      </Toolbar>
    );
  }
}
