
import { BaseAction } from '../../common-app';
import { ApiModel, messageFactory } from './api';
import { actionIds } from './const';
import { Model } from './store';


// Target: API
export const enrollRoomRequest = (sessionInfo: ApiModel.SessionInfo): BaseAction<ApiModel.SessionInfo> => ({
  type: actionIds.ENROLL_ROOM_REQUEST,
  payload: sessionInfo,
});

export const disconnectRoomRequest = (): BaseAction => ({
  type: actionIds.DISCONNECT,  
});

// TODO: Unused, remove?
export const onDisconnect = (): BaseAction => ({
  type: actionIds.ON_DISCONNECT,  
});

export const sendMessage = (nickname: string, room: string, text: string): BaseAction<ApiModel.SimpleMessage> => ({
  type: actionIds.SEND_MESSAGE, 
  payload: messageFactory(nickname, room, text),
});

// Target: STORE
export const onMessageReceived = (message: Model.Message): BaseAction<Model.Message> => ({
  type: actionIds.MESSAGE_RECEIVED, 
  payload: message,
});

export const onMessageListReceived = (messageList): BaseAction<Model.Message[]> => ({
  type: actionIds.MESSAGE_LIST_RECEIVED, 
  payload: messageList,
});

export const updateCurrentMessage = (currentMessage): BaseAction<string> => ({
  type: actionIds.UPDATE_CURRENT_MESSAGE,
  payload: currentMessage,
});

export const updateSearchTerm = (searchTerm): BaseAction<string> => ({
  type: actionIds.UPDATE_SEARCH_TERM,
  payload: searchTerm,
});


