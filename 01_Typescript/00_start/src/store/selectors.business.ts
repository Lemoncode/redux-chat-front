import { Message } from "./model";

const findInMessage = (searchTerm: string) => {
  const search = searchTerm.toUpperCase();
  return msg => msg && (
    msg.text.toUpperCase().includes(search) || 
    msg.user.toUpperCase().includes(search));
}

export const filterChatLogBySearchTerm = (searchTerm: string, chatLog: Message[]) => {
  const searchTrimmed = searchTerm && searchTerm.trim();
  return chatLog && searchTrimmed ?
    chatLog.filter(findInMessage(searchTrimmed)) : chatLog;
};
