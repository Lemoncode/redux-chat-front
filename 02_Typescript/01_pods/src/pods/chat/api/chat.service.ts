import * as ioClient from 'socket.io-client';
import { SimpleMessage } from './model';

export const messageFactory = (nickname: string, room: string, text: string): SimpleMessage => ({
  channel: room,
  user: nickname,
  text
})

export interface SocketDescriptor {
  url: string;
  channel: string;
  options?: SocketIOClient.ConnectOpts;
}

export const createSocket = (socket: SocketDescriptor) => 
  ioClient(`${socket.url}/${socket.channel}`, socket.options);
  