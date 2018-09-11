import * as React from 'react';
import { SingleView } from '../layout/single-view.component';
import { ChatContainer } from '../pods/chat';

export const SceneChat: React.StatelessComponent = () => 
  <SingleView>
    <ChatContainer />
  </SingleView>