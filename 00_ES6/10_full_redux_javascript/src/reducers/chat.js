import { actionIds } from '../common';
import { mapApiSingleMessageToStateModel, mapApiMessagesToStateModel } from './chat.business';

const defaultState = () => ({
  chatLog: [],
  searchTerm: '',
});

export const chatReducer = (state = defaultState(), action) => {
  switch (action.type) {
    case actionIds.MESSAGE_RECEIVED:
      return handleMessageReceived(state, action.payload);
    case actionIds.MESSAGE_LIST_RECEIVED:
      return handleMessageListReceived(state, action.payload);
    case actionIds.UPDATE_SEARCH_TERM:
      return handleUpdateSearchTerm(state, action.payload);
  }

  return state;
}

export const handleMessageReceived = (state, message) => ({
  ...state,
  chatLog: [...state.chatLog, mapApiSingleMessageToStateModel(message)],
});

export const handleMessageListReceived = (state, messageList) => ({
  ...state,
  chatLog: mapApiMessagesToStateModel(messageList),
});

export const handleUpdateSearchTerm = (state, searchTerm) => ({
  ...state,
  searchTerm,
});
