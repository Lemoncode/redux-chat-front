import { BaseAction } from '../../../common-app';
import { actionIds } from '../const';
import * as Model from './model';


type ChatReducer = (state: Model.ChatState, action: BaseAction) => Model.ChatState;

export const chatDefaultState = (): Model.ChatState => ({
  chatLog: [],
  chatCurrentMessage: '',
  searchTerm: '',
});

export const chatReducer: ChatReducer = (state = chatDefaultState(), action) => {
  switch (action.type) {
    case actionIds.MESSAGE_RECEIVED:
      return handleMessageReceived(state, action.payload as Model.Message);
    case actionIds.MESSAGE_LIST_RECEIVED:
      return handleMessageListReceived(state, action.payload as Model.Message[]);
    case actionIds.UPDATE_CURRENT_MESSAGE:
      return handleUpdateChatCurrentMessage(state, action.payload as string);
    case actionIds.UPDATE_SEARCH_TERM:
      return handleUpdateSearchTerm(state, action.payload as string);
  }

  return state;
};

export const handleMessageReceived = (
  state: Model.ChatState,
  message: Model.Message
): Model.ChatState => ({
  ...state,
  chatLog: [...state.chatLog, message],
});

export const handleMessageListReceived = (
  state: Model.ChatState,
  messageList: Model.Message[]
): Model.ChatState => ({
  ...state,
  chatLog: messageList,
});

export const handleUpdateChatCurrentMessage = (
  state: Model.ChatState,
  chatCurrentMessage: string
): Model.ChatState => ({
  ...state,
  chatCurrentMessage,
});

export const handleUpdateSearchTerm = (
  state: Model.ChatState,
  searchTerm: string
): Model.ChatState => ({
  ...state,
  searchTerm,
});
