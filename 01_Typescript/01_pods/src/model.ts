import { CoreModel } from './core';
import { ChatModel } from './pods/chat';
import { LobbyModel } from './pods/lobby';

export interface State {
  core: CoreModel.State;
  podLobby: LobbyModel.State;
  podChat: ChatModel.State;
}