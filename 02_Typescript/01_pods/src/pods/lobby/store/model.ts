export type Room = string;

export interface LobbyState {
  rooms: Room[];
  candidateRoom: Room;
  candidateNickname: string;
};

export interface State {
  lobby: LobbyState;
};
