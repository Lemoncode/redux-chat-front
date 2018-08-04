import React from 'react';
import { Link } from 'react-router-dom';

export const ChatContainer = () =>
  <React.Fragment>
    <h1>Hello from chat page</h1>
    <Link to="/">Navigate back to lobby</Link>
  </React.Fragment>