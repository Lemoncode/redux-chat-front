import * as Model from './model';
export { Model };

import { combineReducers } from 'redux';
import { chatReducer } from './chat.reducer';

export const chatRootReducer = combineReducers<Model.State>({
  chat: chatReducer,
});
