import { createSocket, SocketDescriptor } from './api';

export const establishRoomSocketConnection = (nickname: string, room: string) => {
  // TODO: move this to env variable
  const baseUrl = 'http://localhost:3000';

  const socketParams: SocketDescriptor = {
    url: baseUrl,
    channel: room,
    options: {
      query: `user=${nickname}`
    },
  };

  return createSocket(socketParams);        
};
