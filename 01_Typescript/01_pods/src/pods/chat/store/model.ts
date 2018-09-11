export interface Message {
  user: string;
  text: string;
};

export interface ChatState {
  chatLog: Message[];
  chatCurrentMessage: string;
  searchTerm: string;
};

export interface State {
  chat: ChatState;
};
