import { combineReducers } from 'redux';
import { sessionInfoReducer } from './session-info';
import { chatLogReducer } from './chat-log';
import { searchReducer } from './search';

export const reducers = combineReducers({
  sessionInfoReducer,
  chatLogReducer,
  searchReducer,
});
