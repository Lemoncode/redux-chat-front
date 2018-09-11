import * as React from 'react';
import { FlexView } from '../layout/flex-view.component';
import { ChatContainer } from '../pods/chat';
import { LobbyContainer } from '../pods/lobby';

export const SceneBoth: React.StatelessComponent = () => 
  <FlexView>
    <LobbyContainer />
    <ChatContainer />
  </FlexView>