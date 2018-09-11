import { combineReducers } from 'redux';
import { coreRootReducer } from './core';
import { chatRootReducer } from './pods/chat';
import { lobbyRootReducer } from './pods/lobby';

// Root reducer.
export const rootReducer = combineReducers({
  core: coreRootReducer,
  podLobby: lobbyRootReducer,
  podChat: chatRootReducer,
});
