import { combineReducers } from 'redux';
import { lobbyReducer } from './lobby';
import { sessionInfoReducer } from './session-info';
import { chatReducer } from './chat';

export const reducers = combineReducers({
  lobbyReducer,
  sessionInfoReducer,
  chatReducer,
});
