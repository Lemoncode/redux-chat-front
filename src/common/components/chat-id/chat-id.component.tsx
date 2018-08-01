import * as React from 'react';
import * as style from './chat-id.styles';
import { Avatar, Typography } from '@material-ui/core';

interface ChatIdProps {
  image: string;
  text: string;
}

export const ChatId = (props: ChatIdProps) => (
  <div className={style.container}>
    <Avatar
      alt={props.text}
      src={props.image}
      className={style.avatar}
    />
    <Typography variant="display1">
      {props.text}
    </Typography>
  </div>
);
