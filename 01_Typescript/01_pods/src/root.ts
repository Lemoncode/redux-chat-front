import { all, fork} from 'redux-saga/effects';
import { chatRootSagas } from './pods/chat';
import { lobbyRootSaga } from './pods/lobby';
import { combineReducers } from 'redux';
import { coreRootReducer, CoreModel } from './core';
import { chatRootReducer, ChatModel } from './pods/chat';
import { lobbyRootReducer, LobbyModel } from './pods/lobby';

export interface State {
  core: CoreModel.State;
  podLobby: LobbyModel.State;
  podChat: ChatModel.State;
}

// Root selectors.
export const coreSelector = (state: State) => state.core;
export const podLobbySelector = (state: State) => state.podLobby;
export const podChatSelector = (state: State) => state.podChat;

// Root reducer.
export const rootReducer = combineReducers({
  core: coreRootReducer,
  podLobby: lobbyRootReducer,
  podChat: chatRootReducer,
});

// Root saga.
export function* rootSaga() {
  yield all([
    fork(chatRootSagas),
    fork(lobbyRootSaga),
  ]);
};