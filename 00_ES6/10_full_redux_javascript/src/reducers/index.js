import { combineReducers } from 'redux';
import { lobbyReducer } from './lobby';
import { sessionInfoReducer } from './session-info';
import { chatLogReducer } from './chat-log';
import { searchReducer } from './search';

export const reducers = combineReducers({
  lobbyReducer,
  sessionInfoReducer,
  chatLogReducer,
  searchReducer,
});
