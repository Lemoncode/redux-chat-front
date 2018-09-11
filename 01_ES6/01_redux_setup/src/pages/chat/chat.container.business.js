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

export const mapApiSingleMessageToViewmodel = (message) => ({
  user: message.user,
  text: message.text,
});

export const mapApiMessagesToViewmodel = (messages) => 
  messages.map((msg) => ({
    user: msg.userId,
    text: msg.text,
  }));