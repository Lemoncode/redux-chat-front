export interface SessionInfoState {
  nickname: string;
  room: string;
}

export interface LobbyState {
  rooms: string[];
  candidateRoom: string;
  candidateNickname: string;
}

export interface ChatState {
  chatLog: string[];
  chatCurrentMessage: string;
  searchTerm: string;
}

export interface State {
  sessionInfo: SessionInfoState;
  lobby: LobbyState;
  chat: ChatState;
}
