import React from 'react';
import { Link } from 'react-router-dom';

export const LobbyContainer = () =>
  <React.Fragment>
    <h1>Hello from Lobby page</h1>
    <Link to="/chat">Navigate to Chat</Link>
  </React.Fragment>