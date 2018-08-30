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

const findInMessage = searchTerm => {
  const search = searchTerm.toUpperCase();
  return msg => msg && (
    msg.text.toUpperCase().includes(search) || 
    msg.user.toUpperCase().includes(search));
}

export const filterChatLogBySearchTerm = (searchTerm, chatLog) => {
  const searchTrimmed = searchTerm.trim();
  return chatLog && searchTrimmed ?
    chatLog.filter(findInMessage(searchTrimmed)) : chatLog;
};
