import { createSocket } from '../../api/chat'

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

export const messagesToString = (messages) => {
  let content = '';
  
  messages.map((ms) => ({
    user: ms.userId,
    text: ms.text
  })).forEach((mc) => {
    content += `${mc.user}: ${mc.text}\n`;        
  });

  return content;
}