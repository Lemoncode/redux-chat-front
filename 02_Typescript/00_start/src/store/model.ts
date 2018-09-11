export interface SessionInfoState {
  nickname: string;
  room: string;
}

export type Room = string;

export interface LobbyState {
  rooms: Room[];
  candidateRoom: Room;
  candidateNickname: string;
}

export interface Message {
  user: string;
  text: string;
}

export interface ChatState {
  chatLog: Message[];
  chatCurrentMessage: string;
  searchTerm: string;
}

export interface State {
  sessionInfo: SessionInfoState;
  lobby: LobbyState;
  chat: ChatState;
}
