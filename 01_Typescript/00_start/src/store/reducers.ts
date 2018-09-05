import { combineReducers } from 'redux';
import { lobbyReducer } from './lobby.reducer';
import { sessionInfoReducer } from './session-info.reducer';
import { chatReducer } from './chat.reducer';

export const reducers = combineReducers({
  lobbyReducer,
  sessionInfoReducer,
  chatReducer,
});
