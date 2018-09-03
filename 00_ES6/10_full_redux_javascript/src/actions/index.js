import { push } from 'connected-react-router';
import { actionIds } from '../common';
import { canEnrollRoom } from '../api/rooms';
import { messageFactory } from '../api/chat';

export const storeSessionInfo = (nickname, room) => ({
  type: actionIds.SETUP_SESSION_INFO,
  payload: { nickname, room }
})

export const canEnrollRequest = (nickname, room) => (dispatch) => {
  canEnrollRoom(room, nickname).then((succeeded) => {
    if (succeeded === true) {
      console.log(`*** Join Room Request succeeded
      Nickname: ${nickname}
      Room: ${room}`);
      dispatch(storeSessionInfo(nickname, room));
      dispatch(push('/chat'));
    } else {
      // We could leverage this to the reducer
      console.log(`Join room request failed try another nickname`);
    }
  });
  // For the sake of the sample no Error handling, we could add it here
}

export const enrollRoomRequest = (nickname, room) => ({
  type: actionIds.ENROLL_ROOM_REQUEST,
  payload: { nickname, room }
});

export const disconnectRoomRequest = () => ({
  type: actionIds.DISCONNECT,  
});

export const onDisconnect = () => ({
  type: actionIds.ON_DISCONNECT,  
});

export const onMessageReceived = (message) => ({
  type: actionIds.MESSAGE_RECEIVED, 
  payload: message,
});

export const onMessageListReceived = (messageList) => ({
  type: actionIds.MESSAGE_LIST_RECEIVED, 
  payload: messageList,
});

export const sendMessage = (nickname, room, text) => ({
  type: actionIds.SEND_MESSAGE, 
  payload: messageFactory(nickname, room, text),
});

export const updateCurrentMessage = (currentMessage) => ({
  type: actionIds.UPDATE_CURRENT_MESSAGE,
  payload: currentMessage,
});

export const updateSearchTerm = (searchTerm) => ({
  type: actionIds.UPDATE_SEARCH_TERM,
  payload: searchTerm,
});

export const updateRoomList = () => ({
  type: actionIds.UPDATE_ROOM_LIST,
});

export const updateRoomListSuccess = (roomList) => ({
  type: actionIds.UPDATE_ROOM_LIST_SUCCESS,
  payload: roomList,
});

export const updateRoomListFail = (message) => ({
  type: actionIds.UPDATE_ROOM_LIST_FAIL,
  payload: message,
});

export const updateCandidateRoom = (candidateRoom) => ({
  type: actionIds.UPDATE_CANDIDATE_ROOM,
  payload: candidateRoom,
});

export const updateCandidateNickname = (candidateNickname) => ({
  type: actionIds.UPDATE_CANDIDATE_NICKNAME,
  payload: candidateNickname,
});