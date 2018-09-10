import * as Model from './model';
export { Model };

import { combineReducers } from 'redux';
import { lobbyReducer } from './lobby.reducer';

export const lobbyRootReducer = combineReducers<Model.State>({
  lobby: lobbyReducer,
});
