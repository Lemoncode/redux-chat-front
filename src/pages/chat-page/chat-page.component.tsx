import * as React from 'react';
import * as styles from './chat-page.styles';
import { ChatHeader } from './components/chat-header';
import { ChatPanel } from './components/chat-panel';
import { ChatFooter } from './components/chat-footer';

export const ChatPage = () => (
  <div className={styles.container}>
    <ChatHeader />
    <ChatPanel />
    <ChatFooter />
  </div>
);
