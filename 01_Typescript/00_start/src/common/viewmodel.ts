export interface SessionInfo {
  nickname: string;
  room: string;
};

export interface ChatMessage {
  user: string;
  text: string;
};

export type ChatLog = ChatMessage[];
