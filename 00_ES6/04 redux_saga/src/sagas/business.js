export const establishRoomSocketConnection = (nickname, room) => {
  // TODO: move this to env variable
  const baseUrl = 'http://localhost:3000';

  const socketParams = {
    url: baseUrl,
    channel: room,
    options: {
      query: `user=${nickname}`
    },
  };

  return createSocket(socketParams);        
}
