import { actionIds } from '../common';
import { mapApiSingleMessageToStateModel, mapApiMessagesToStateModel } from './chat-log.business';

// TODO: Javi Calzado update to new refactor, do not use string structure
// use message structure
const defaultState = () => [];


export const chatLogReducer = (state = defaultState(), action) => {
  switch (action.type) {
    case actionIds.MESSAGE_RECEIVED:
      return handleMessageReceived(state, action.payload);
    case actionIds.MESSAGE_LIST_RECEIVED:
      return handleMessageListReceived(state, action.payload);

  }

  return state;
}

export const handleMessageReceived = (state, message) => ([
  ...state,
  mapApiSingleMessageToStateModel(message),
]);

export const handleMessageListReceived = (state, messageList) => ([
  ...state,
  mapApiMessagesToStateModel(messageList),
]);