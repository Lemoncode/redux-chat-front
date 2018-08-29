import { combineReducers } from 'redux';
import { sessionInfoReducer } from './session-info';
import { chatLogReducer } from './chat-log';

export const reducers = combineReducers({
  sessionInfoReducer,
  chatLogReducer,
});
