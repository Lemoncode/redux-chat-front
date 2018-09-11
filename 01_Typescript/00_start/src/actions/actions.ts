import { push } from 'connected-react-router';
import { ApiModel, canEnrollRoom, messageFactory } from '../api';
import { Model } from '../store';
import { BaseAction } from './base';
import { actionIds } from './const';

// Target: STORE
export const storeSessionInfo = (nickname: string, room: string): BaseAction<Model.SessionInfoState> => ({
  type: actionIds.SETUP_SESSION_INFO,
  payload: { nickname, room }
});

// Target: API
export const canEnrollRequest = (nickname: string, room: string) => (dispatch) => {
  canEnrollRoom(room, nickname).then((succeeded: boolean) => {
    if (succeeded === true) {
      console.log(`*** Join Room Request succeeded
        Nickname: ${nickname}
        Room: ${room}`);
      dispatch(storeSessionInfo(nickname, room));
      dispatch(push('/chat'));
    } else {
      console.log(`Join room request failed try another nickname`);
    }
  });
};

// Target: API
export const enrollRoomRequest = (nickname: string, room: string): BaseAction<ApiModel.SessionInfo> => ({
  type: actionIds.ENROLL_ROOM_REQUEST,
  payload: { nickname, room }
});

// Target: API
export const disconnectRoomRequest = (): BaseAction => ({
  type: actionIds.DISCONNECT,  
});

// Target: Unused
export const onDisconnect = (): BaseAction => ({
  type: actionIds.ON_DISCONNECT,  
});

// Target: STORE
export const onMessageReceived = (message: Model.Message): BaseAction<Model.Message> => ({
  type: actionIds.MESSAGE_RECEIVED, 
  payload: message,
});

// Target: STORE
export const onMessageListReceived = (messageList): BaseAction<Model.Message[]> => ({
  type: actionIds.MESSAGE_LIST_RECEIVED, 
  payload: messageList,
});

// Target: API
export const sendMessage = (nickname: string, room: string, text: string): BaseAction<ApiModel.SimpleMessage> => ({
  type: actionIds.SEND_MESSAGE, 
  payload: messageFactory(nickname, room, text),
});

// Target: STORE
export const updateCurrentMessage = (currentMessage): BaseAction<string> => ({
  type: actionIds.UPDATE_CURRENT_MESSAGE,
  payload: currentMessage,
});

// Target: STORE
export const updateSearchTerm = (searchTerm): BaseAction<string> => ({
  type: actionIds.UPDATE_SEARCH_TERM,
  payload: searchTerm,
});

// Target: API
export const updateRoomList = (): BaseAction => ({
  type: actionIds.UPDATE_ROOM_LIST,
});

// Target: STORE
export const updateRoomListSuccess = (roomList): BaseAction<Model.Room[]> => ({
  type: actionIds.UPDATE_ROOM_LIST_SUCCESS,
  payload: roomList,
});

// Target: View
export const updateRoomListFail = (message): BaseAction<string> => ({
  type: actionIds.UPDATE_ROOM_LIST_FAIL,
  payload: message,
});

// Target: STORE
export const updateCandidateRoom = (candidateRoom): BaseAction<string> => ({
  type: actionIds.UPDATE_CANDIDATE_ROOM,
  payload: candidateRoom,
});

// Target: STORE
export const updateCandidateNickname = (candidateNickname): BaseAction<string> => ({
  type: actionIds.UPDATE_CANDIDATE_NICKNAME,
  payload: candidateNickname,
});