import { combineReducers } from 'redux';
import { lobbyReducer } from './lobby.reducer';
import { sessionInfoReducer } from './session-info.reducer';
import { chatReducer } from './chat.reducer';
import { Model } from '../store';

export const reducers = combineReducers<Model.State>({
  sessionInfo: sessionInfoReducer,
  lobby: lobbyReducer,
  chat: chatReducer,
});
