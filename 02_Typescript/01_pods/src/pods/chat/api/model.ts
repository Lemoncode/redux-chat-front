export interface SessionInfo {
  nickname: string;
  room: string;
};

// TODO: Merge both message types. Modify backend to do so.
export interface Message {
  userId: string;
  text: string;
  timestamp: number;
};

export interface SimpleMessage {
  channel: string;
  user: string;
  text: string;
}
